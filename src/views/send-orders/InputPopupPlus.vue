<template>
  <van-popup :show="visible" @close="handleClose" @opened="handleOpened" teleport="body" round position="bottom"
    style="background: transparent;">
    <div class="popup-header">
      <div></div>
      <ec-icon name="cross" class="button-icon" @click="handleClose" />
    </div>
    <div class="popup-content">
      <!-- <div class="popup-nav">
        隐患识别规则说明
      </div> -->
      <div class="popup-main">
        <van-field ref="textareaRef" v-model.trim="textarea" type="textarea" :rows="7" :autosize="{ minRows: 7 }"
          maxlength="200" show-word-limit placeholder="请输入..." class="textarea-content" />
        <div class="footer-actions">
          <!-- <div class="import-btn btn" @click="handleImport" v-if="showLast">引用上次</div>
          <div class="import-btn btn" @click="handleImportMore" v-else>引用更多</div> -->
          <div :class="['icon-voice', { recording: isRecording }]" @click="handleVoice"></div>
          <div class="submit-btn btn" @click="handleSubmit">确定</div>
        </div>
        <div class="import-btn">
          <!-- <div @click="handleImport" v-if="showLast">引用上次</div>
          <div @click="handleImportMore" v-else>引用更多</div> -->
          <div @click="handleImportMore">引用</div>
        </div>
      </div>

    </div>
    <SelectPopup :visible="selectVisible" :options="storageArr" @update="textarea = $event"
      @close="selectVisible = false" />
  </van-popup>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Icon as EcIcon, showFailToast, showSuccessToast } from 'vant';
// import { AliyunSpeechTranscription } from '@enn/voice-assistant-client';
import SelectPopup from './SelectPopup.vue';
const { AliyunSpeechTranscription } = window;

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  inputVal: {
    type: String,
    default: ''
  },
  localStorageKey: {
    type: String,
    default: ''
  },

})
const emit = defineEmits(['close', 'update', 'clear']);
const textareaRef = ref(null);
const textarea = ref('');
const showLast = ref(true);
const selectVisible = ref(false);
const storageArr = ref([]);
const isRecording = ref(false);
let aliyunSpeechTranscription = null;

// 关闭弹窗时重置滚动位置
const handleClose = async () => {
  await stopRecording();
  textarea.value = '';
  emit('close');
  if (!props.inputVal) emit('clear');
};
const handleOpened = () => {
  showLast.value = true;
  textareaRef.value.focus();
  textarea.value = props.inputVal;
  const arr = localStorage.getItem(props.localStorageKey);
  storageArr.value = JSON.parse(arr || '[]');
}
const handleSubmit = () => {
  if (textarea.value.trim() === '') {
    return showFailToast('请输入描述');
  }
  emit('update', textarea.value);
  if (!storageArr.value.includes(textarea.value)) {
    storageArr.value.unshift(textarea.value);
  }
  storageArr.value = storageArr.value.slice(0, 5);
  localStorage.setItem(props.localStorageKey, JSON.stringify(storageArr.value));
  handleClose();
}


const handleImport = () => {
  if (storageArr.value.length) {
    textarea.value = storageArr.value[0];
    showLast.value = false;
  } else {
    showFailToast('暂无上次描述');
  }
}
const handleImportMore = () => {
  if(storageArr.value.length) {
    selectVisible.value = true;
  } else {
    showFailToast('暂无可引用描述');
  }
}


const handleVoice = async () => {
  const request = isRecording.value ? stopRecording : startRecording;
  await request().catch((error) => {
    console.error('语音功能错误:', error);
    isRecording.value = false;
  });
};

async function startRecording() {
  // 检查麦克风权限
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.getTracks().forEach(track => track.stop());

    // 初始化或使用现有实例
    if (!aliyunSpeechTranscription) {
      aliyunSpeechTranscription = new AliyunSpeechTranscription({
        // 根据环境选择合适的URL
        // url: 'wss://voice-assistant-server.fat.ennew.com/ws/nls', // FAT环境
        // url: 'wss://static.ennew.com/ws_voice_assistant', // PROD环境
        url: import.meta.env.VITE_APP_VOICE_API,
        bizData: {
          service: 'voice_transcription',
          appId: 'ai_engine_app'
        },
        nlsOptions: {
          enable_intermediate_result: true,
          enable_punctuation_prediction: true,
          enable_inverse_text_normalization: true
        }
      });

      // 设置事件监听器
      setupEventListeners();
    }

    // showSuccessToast('开始录音，请说话');
    isRecording.value = true;
    await aliyunSpeechTranscription.start();
  } catch (error) {
    console.error('开始录音失败:', error);
    // showFailToast('麦克风权限被拒绝或录音失败');
    isRecording.value = false;
  }
}

async function stopRecording() {
  if (aliyunSpeechTranscription) {
    try {
      await aliyunSpeechTranscription.stop();
      isRecording.value = false;
      // showToast('录音已结束');
    } catch (error) {
      console.error('停止录音失败:', error);
      // showFailToast('停止录音失败');
      isRecording.value = false;
    }
  }
}

let originText = '';
function setupEventListeners() {
  if (!aliyunSpeechTranscription) return;

  // 会话开始
  aliyunSpeechTranscription.on('started', () => {
    console.log('语音识别会话开始');
    originText = textarea.value;
  });

  // 句子开始
  aliyunSpeechTranscription.on('begin', (msg) => {
    console.log(`句子编号 ${msg.index} 开始识别`);
  });

  // 中间结果更新
  aliyunSpeechTranscription.on('changed', (msg) => {
    console.log('中间结果:', msg.result);
    textarea.value = originText + msg.result;
    // 这里可以选择是否显示中间结果
  });

  // 句子结束
  aliyunSpeechTranscription.on('end', (msg) => {
    console.log('句子结束，最终结果:【', msg.result, '】');
    // 将识别结果添加到文本框
    if (msg.result && msg.result.trim()) {
      textarea.value = originText + msg.result.trim();
      originText = textarea.value;
    }
  });

  // 会话完成
  aliyunSpeechTranscription.on('completed', () => {
    console.log('语音识别会话完成');
    isRecording.value = false;
  });

  // 连接关闭
  aliyunSpeechTranscription.on('closed', () => {
    console.log('语音服务连接关闭');
    isRecording.value = false;
  });

  // 服务失败
  aliyunSpeechTranscription.on('failed', (error) => {
    console.error('语音服务错误:', error);
    showFailToast('语音识别服务失败');
    isRecording.value = false;
  });

  // WebSocket错误
  aliyunSpeechTranscription.on('error', (error) => {
    console.error('WebSocket连接错误:', error);
    showFailToast('连接语音服务失败');
    isRecording.value = false;
  });
}

// 组件挂载时初始化
onMounted(() => {
  // 初始化延迟到实际使用时
});

// 组件卸载前清理
onBeforeUnmount(() => {
  if (aliyunSpeechTranscription) {
    try {
      aliyunSpeechTranscription.stop();
    } catch (e) {
      console.error('清理语音服务失败:', e);
    }
    aliyunSpeechTranscription = null;
  }
});
</script>

<style lang="scss" scoped>
:deep(.ec-cascader__title) {
  width: 90%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;

  .button-icon {
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.popup-content {
  $primary-color: #01C2C3;
  background: #fff;
  border-radius: 16px 16px 0px 0px;
  overflow: hidden;
  position: relative;



  .popup-main {
    height: 260px;
    overflow: auto;

    .textarea-content {
      // margin-top: 10px;
      // padding-left: 28px;

    }

    .footer-actions {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;

      padding: 16px;

      .submit-btn {
        height: 29px;
        line-height: 29px;
        padding: 0 12px;
        text-align: center;
        border-radius: 18px 18px 18px 18px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        background: $primary-color;
        color: #F9FCFF;

        &:active {
          background: rgba($primary-color, 0.8);
        }
      }

      .icon-voice {
        width: 23px;
        height: 23px;
        cursor: pointer;
        transition: transform 0.3s;
        background-image: url('@/assets/img-ecej/icon-voice.png');
        background-size: cover;

        &.recording {
          width: 31px;
          height: 31px;
          margin-top: -4px;
          margin-left: -4px;
          animation: pulse 1.5s infinite;
          background-image: url('@/assets/img-ecej/icon-voice-active1.png');
        }
      }
    }
    .import-btn {
      position: absolute;
      bottom: 55px;
      left: 14px;
      // width: 75px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: $primary-color;

      &:active {
        font-weight: 600;
      }
    }
  }
}

@keyframes pulse {
  0% {
    filter: brightness(1);
    transform: scale(1);
  }

  50% {
    filter: brightness(1.1);
    transform: scale(1.1);
  }

  100% {
    filter: brightness(1);
    transform: scale(1);
  }
}
</style>
