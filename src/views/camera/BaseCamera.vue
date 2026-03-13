<template>
  <div class="container" :class="{'visible': visible}">
    <!-- <ec-icon :size="24" class="close-btn" @click="$emit('update:visible', false)"><ic-close /></ec-icon> -->
    <ec-icon name="cross" class="close-btn" @click="$emit('update:visible', false)" />
    <div class="video-container" @click="handleVideoClick" :style="{ cursor: isAutoFocus ? 'default' : 'crosshair' }">
      <video ref="videoElement" class="video-element" autoplay playsinline @loadedmetadata="onVideoMetadataLoaded"></video>
      <!-- 用于绘制检测框的canvas -->
      <canvas ref="canvasElement" class="canvas-overlay"></canvas>
      <!-- 聚焦指示器 -->
      <div class="focus-indicator" v-if="showFocusIndicator" :style="{
        left: `${focusPoint.x * 100}%`,
        top: `${focusPoint.y * 100}%`
      }"></div>
    </div>
    <div class="action-group">
      <div @click="toggleFlash">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 3L7 12H11V21L17 12H13V3Z" 
            :fill="filled ? 'white' : 'none'" 
            stroke="white" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
        </svg>
      </div>
      <div @click="captureFrame" class="save-photo">
      </div>
      <div @click="toggleFocusMode" class="focus-button">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :stroke-dasharray="auto ? '4 2' : 'none'"/>
        </svg>
        <!-- {{ isAutoFocus ? '自动聚焦' : '手动聚焦' }} -->
        {{ isAutoFocus ? '自动' : '手动' }}
      </div>

    </div>

    <!-- <div class="controls">

      <button @click="toggleFlash" class="flash-btn" :disabled="!cameraActive">
        <FlashIcon :filled="flashActive" /> {{ flashActive ? '关闭闪光灯' : '开启闪光灯' }}
      </button>
      <button @click="captureFrame" class="recognize-btn" :disabled="!cameraActive">
        识别物体
      </button>
      <button @click="toggleFocusMode" class="focus-btn" :disabled="!cameraActive">
        <FocusIcon :auto="isAutoFocus" /> {{ isAutoFocus ? '自动聚焦' : '手动聚焦' }}
      </button>

      
    </div>

    <div class="status">
      <div class="status-dot" :class="{ active: cameraActive }"></div>
      <span>{{ statusText }}</span>
    </div> -->

    <!-- 识别结果显示区域 -->
    <div v-if="detections.length" class="results">
      <h3>检测结果:</h3>
      <div class="detection-list">
        <div v-for="(detection, index) in detections" :key="index" class="detection-item">
          {{ detection.class }} ({{ (detection.confidence * 100).toFixed(1) }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted, watch } from 'vue'
import { Icon as EcIcon } from 'vant';
// 响应式数据
const videoElement = ref(null)
const canvasElement = ref(null)
const cameraActive = ref(false)
const flashActive = ref(false)
const statusText = ref('摄像头未开启')
const stream = ref(null)
const isAutoFocus = ref(true)
const focusPoint = ref({ x: 0.5, y: 0.5 })
const showFocusIndicator = ref(false)
const canvasContext = ref(null)
const detections = ref([])
const cameraSupported = ref(true)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    startCamera()
  } else {
    stopCamera()
  }
})

// 方法
const startCamera = async () => {
  try {
    // 检查浏览器支持
    if (!checkCameraSupport()) return

    // 微信浏览器特殊处理
    if (isWechatBrowser()) {
      statusText.value = '微信浏览器加载中...'
      await new Promise(resolve => setTimeout(resolve, 300))
    }

    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 },
        advanced: [
          // 使用标准的focusMode属性
          { focusMode: 'continuous' }
        ]
      }
    })

    if (videoElement.value) {
      videoElement.value.srcObject = stream.value

      // 微信浏览器特殊处理：多次尝试播放
      try {
        // 第一次尝试
        await videoElement.value.play()
      } catch (firstError) {
        console.warn('第一次播放尝试失败:', firstError)
        // 微信浏览器可能需要延迟重试
        setTimeout(async () => {
          try {
            await videoElement.value.play()
          } catch (secondError) {
            console.warn('第二次播放尝试也失败:', secondError)
            // 可以在这里提示用户点击屏幕播放
            statusText.value = '请点击视频区域开始播放'
            // 添加点击事件监听器
            const handleVideoClick = async () => {
              try {
                await videoElement.value.play()
                statusText.value = '摄像头已开启 - 自动聚焦模式'
                // 移除事件监听器避免重复调用
                videoElement.value.removeEventListener('click', handleVideoClick)
              } catch (error) {
                console.error('用户点击播放失败:', error)
              }
            }
            videoElement.value.addEventListener('click', handleVideoClick)
          }
        }, 500)
      }
    }

    // 初始化画布上下文
    if (canvasElement.value) {
      canvasContext.value = canvasElement.value.getContext('2d')
    }

    cameraActive.value = true
    isAutoFocus.value = true
    statusText.value = '摄像头已开启 - 自动聚焦模式'

  } catch (error) {
    console.error('访问摄像头时出错:', error)
    statusText.value = `无法访问摄像头: ${error.message || '未知错误'}`
  }
}

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null

    if (videoElement.value) {
      videoElement.value.srcObject = null
    }

    // 清除画布
    clearCanvas()

    cameraActive.value = false
    flashActive.value = false
    isAutoFocus.value = true
    showFocusIndicator.value = false
    detections.value = []
    statusText.value = '摄像头已关闭'
  }
}

const toggleFlash = async () => {
  try {
    if (!cameraActive.value || !stream.value) {
      statusText.value = '请先开启摄像头'
      return
    }

    const track = stream.value.getVideoTracks()[0]
    if (!track) {
      statusText.value = '无法获取视频轨道'
      return
    }

    const newFlashState = !flashActive.value
    await track.applyConstraints({ advanced: [{ torch: newFlashState }] })

    flashActive.value = newFlashState
    statusText.value = `摄像头已开启 - 闪光灯${newFlashState ? '开启' : '关闭'}`

  } catch (error) {
    console.error('控制闪光灯时出错:', error)
    flashActive.value = !flashActive.value
    statusText.value = `操作闪光灯失败: ${error.message || '未知错误'}`
  }
}

const toggleFocusMode = async () => {
  try {
    if (!cameraActive.value || !stream.value) {
      statusText.value = '请先开启摄像头'
      return
    }

    isAutoFocus.value = !isAutoFocus.value
    const track = stream.value.getVideoTracks()[0]

    if (!track) {
      statusText.value = '无法获取视频轨道'
      return
    }

    // 使用标准的focusMode属性，而不是autoFocusMode
    await track.applyConstraints({
      advanced: [{ focusMode: isAutoFocus.value ? 'continuous' : 'single-shot' }]
    })

    statusText.value = isAutoFocus.value
      ? '摄像头已开启 - 自动聚焦模式'
      : '摄像头已开启 - 手动点击聚焦模式'

  } catch (error) {
    console.error('切换聚焦模式时出错:', error)
    isAutoFocus.value = !isAutoFocus.value
    statusText.value = `切换聚焦模式失败: ${error.message || '未知错误'}`
  }
}

const handleVideoClick = async (event) => {
  try {
    if (!cameraActive.value || !stream.value || isAutoFocus.value) {
      return
    }

    const videoContainer = event.currentTarget
    const rect = videoContainer.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    focusPoint.value = { x, y }
    showFocusIndicator.value = true

    setTimeout(() => {
      showFocusIndicator.value = false
    }, 800)

    const track = stream.value.getVideoTracks()[0]
    if (track) {
      // 简化聚焦约束，确保浏览器兼容性
      await track.applyConstraints({
        advanced: [
          { focusMode: 'single-shot' }
        ]
      })
    }

  } catch (error) {
    console.error('设置聚焦点时出错:', error)
  }
}

// 物体识别相关函数

// 检查浏览器支持
const checkCameraSupport = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    statusText.value = '您的浏览器不支持摄像头访问'
    cameraSupported.value = false
    return false
  }
  return true
}

// 检测是否在微信浏览器中
const isWechatBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return /micromessenger/i.test(userAgent)
}

// 清除画布
const clearCanvas = () => {
  if (canvasContext.value && canvasElement.value) {
    canvasContext.value.clearRect(
      0, 0,
      canvasElement.value.width,
      canvasElement.value.height
    )
  }
}

// 调整画布尺寸与视频一致
const resizeCanvas = () => {
  if (videoElement.value && canvasElement.value) {
    // 保持画布宽高比与视频一致
    canvasElement.value.width = videoElement.value.videoWidth
    canvasElement.value.height = videoElement.value.videoHeight
  }
}

// 视频元数据加载完成事件处理
const onVideoMetadataLoaded = () => {
  resizeCanvas()
}

// 捕获帧并发送识别请求
const captureFrame = async () => {
  if (!cameraActive.value || !canvasContext.value || !canvasElement.value || !videoElement.value) {
    statusText.value = '请先开启摄像头'
    return
  }

  try {
    statusText.value = '正在识别物体...'

    // 调整画布尺寸
    resizeCanvas()

    // 绘制当前视频帧到画布
    canvasContext.value.drawImage(
      videoElement.value,
      0, 0,
      canvasElement.value.width,
      canvasElement.value.height
    )

    // 将画布内容转换为Base64
    const imageData = canvasElement.value.toDataURL('image/jpeg', 0.7)
    console.log('发送的图像数据:', imageData)

    // 发送到后端进行识别
    const recognitionResult = await sendForRecognition(imageData)

    // 处理识别结果
    if (recognitionResult && recognitionResult.detections) {
      detections.value = recognitionResult.detections
      drawDetections(recognitionResult.detections)
      statusText.value = `识别完成，发现 ${detections.value.length} 个物体`
    } else {
      statusText.value = '识别失败，请重试'
      detections.value = []
    }
  } catch (error) {
    console.error('识别过程出错:', error)
    statusText.value = `识别错误: ${error.message || '未知错误'}`
  }
}

// 发送识别请求到后端
const sendForRecognition = async (imageData) => {
  // 这里替换为你的后端API地址
  const API_URL = 'http://localhost:8000/api/recognize'

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData.split(',')[1] // 移除Base64前缀
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API请求错误:', error)
    // 模拟响应用于演示
    return simulateRecognitionResponse()
  }
}

// 绘制检测框
const drawDetections = (detections) => {
  if (!canvasContext.value || !canvasElement.value) return

  // 清除之前的绘制
  clearCanvas()

  // 绘制每个检测结果
  detections.forEach(detection => {
    const [x, y, width, height] = detection.bbox
    const label = `${detection.class} (${(detection.confidence * 100).toFixed(1)}%)`

    // 绘制边界框
    canvasContext.value.strokeStyle = '#FF3B30'
    canvasContext.value.lineWidth = 3
    canvasContext.value.strokeRect(x, y, width, height)

    // 绘制标签背景
    canvasContext.value.fillStyle = '#FF3B30'
    const textWidth = canvasContext.value.measureText(label).width
    canvasContext.value.fillRect(x, y - 25, textWidth + 10, 25)

    // 绘制标签文本
    canvasContext.value.fillStyle = '#FFFFFF'
    canvasContext.value.font = '16px Arial'
    canvasContext.value.fillText(label, x + 5, y - 8)
  })
}

// 模拟识别响应（用于演示）
const simulateRecognitionResponse = () => {
  // 在实际应用中，这里应该是从后端获取的真实数据
  return {
    detections: [
      {
        class: 'person',
        confidence: 0.89,
        bbox: [100, 100, 200, 400]
      },
      {
        class: 'chair',
        confidence: 0.76,
        bbox: [300, 200, 150, 150]
      }
    ]
  }
}

// 生命周期钩子
onMounted(() => {
  checkCameraSupport()

  // 监听窗口尺寸变化，调整画布大小
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (stream.value) {
    stopCamera()
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  // overflow: scroll;
  display: none;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  &.visible {
    display: block;
    opacity: 1;
  }
  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    color: #fff;
    font-size: 24px;
    font-weight: 800;
  }
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* height: 0; */
  /* padding-bottom: 56.25%; */
  background: #000;
  // border-radius: 10px;
  overflow: hidden;
}


.video-element {
  width: 100%;
  height: auto;
  /* min-height: 400px; */
  background: #000;
  display: block;
}

.canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.action-group{
  // padding: 15px;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 80px;
  position: absolute;
  bottom: 0;
  .save-photo{
    background-color: #fff;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    position: relative;
    &::before{ 
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 46px;
      height: 46px;
      border-radius: 100%;
      border: 2px solid #fff;
    }
  }
  .focus-button{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    // width: 35px;
    // border-radius: 100%;
    color: #fff;
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
}

button {
  width: 100%;
  justify-content: center;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.flash-btn {
  background: linear-gradient(to right, #ffd700, #ff8c00);
}

.focus-btn {
  background: linear-gradient(to right, #00c6ff, #0072ff);
}

.recognize-btn {
  background: linear-gradient(to right, #8e2de2, #4a00e0);
}

.focus-indicator {
  position: absolute;
  width: 80px;
  height: 80px;
  margin-left: -40px;
  margin-top: -40px;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  animation: focus-animation 0.8s ease-out;
  pointer-events: none;
}

@keyframes focus-animation {
  0% {
    transform: scale(1.5);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff4757;
  transition: background 0.3s ease;
}

.status-dot.active {
  background: #2ed573;
}

/* 识别结果样式 */
.results {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.results h3 {
  margin-top: 0;
  color: #fff;
}

.detection-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.detection-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #fff;
}
</style>