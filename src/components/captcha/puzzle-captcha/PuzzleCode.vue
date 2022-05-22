<template>
    <teleport to="body">
        <!-- 本体部分 -->
        <div :class="['vue-puzzle-vcode', { show_: show }]" @mousedown="onCloseMouseDown" @mouseup="onCloseMouseUp"
            @touchstart="onCloseMouseDown" @touchend="onCloseMouseUp">
            <div class="vue-auth-box_" @mousedown.stop @touchstart.stop>
                <div class="auth-body_" :style="`height: ${canvasHeight}px`">
                    <!-- 主图，有缺口 -->
                    <!-- <canvas ref="canvas1" :width="canvasWidth" :height="canvasHeight"
                        :style="`width:${canvasWidth}px;height:${canvasHeight}px`" /> -->
                    <!-- 成功后显示的完整图 -->
                    <!-- <canvas ref="canvas3" :class="['auth-canvas3_', { show: isSuccess }]" :width="canvasWidth"
                        :height="canvasHeight" :style="`width:${canvasWidth}px;height:${canvasHeight}px`" /> -->
                    <!-- 小图 -->
                    <!-- <canvas ref="canvas2" class="auth-canvas2_" :width="puzzleBaseSize" :height="canvasHeight" :style="`width:${puzzleBaseSize}px;height:${canvasHeight}px;transform:translateX(${styleWidth -
                    sliderBaseSize -
                    (puzzleBaseSize - sliderBaseSize) *
                    ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize))
                    }px)`" /> -->
                    <!-- 主图，有缺口 -->
                    <img ref="img1" :src="image1" alt="" :width="canvasWidth" :height="canvasHeight">
                    <!-- 小图 -->
                    <img ref="img2" :src="image2" class="auth-canvas2_" :height="canvasHeight"
                        :style="`transform:translateX(${styleWidth - sliderBaseSize}px)`" alt="">
                    <div :class="['loading-box_', { hide_: !loading }]">
                        <div class="loading-gif_">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div :class="['info-box_', { show: infoBoxShow }, { fail: infoBoxFail }]">
                        {{ infoText }}
                    </div>
                    <div :class="['flash_', { show: isSuccess }]" :style="`transform: translateX(${isSuccess
                    ? `${canvasWidth + canvasHeight * 0.578}px`
                    : `-${canvasHeight * 0.578}px`
                    }) skew(-30deg, 0);`"></div>
                    <img class="reset_" @click="reset" src="../../../assets/reset.png" />
                </div>
                <div class="auth-control_">
                    <div class="range-box" :style="`height:${sliderBaseSize}px`">
                        <div class="range-text">{{ sliderText }}</div>
                        <div class="range-slider" ref="rangeSlider" :style="`width:${styleWidth}px`">
                            <div :class="['range-btn', { isDown: mouseDown }]" :style="`width:${sliderBaseSize}px`"
                                @mousedown="onRangeMouseDown($event)" @touchstart="onRangeMouseDown($event)">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>


<script lang="ts">
interface State {
    mouseDown: boolean; // 鼠标是否在按钮上按下
    startWidth: number; // 鼠标点下去时父级的width
    startX: number; // 鼠标按下时的X
    newX: number; // 鼠标当前的偏移X
    pinX: number; // 拼图的起始X
    pinY: number; // 拼图的起始Y
    loading: boolean; // 是否正在加在中，主要是等图片onload
    isCanSlide: boolean; // 是否可以拉动滑动条
    error: boolean; // 图片加在失败会出现这个，提示用户手动刷新
    infoBoxShow: boolean; // 提示信息是否出现
    infoText: string; // 提示等信息
    infoBoxFail: boolean; // 是否验证失败
    // eslint-disable-next-line no-undef
    timer1: NodeJS.Timeout | undefined; // setTimout1
    closeDown: boolean; // 为了解决Mac上的click BUG
    isSuccess: boolean; // 验证成功
    imgIndex: number; // 用于自定义图片时不会随机到重复的图片
    isSubmting: boolean; // 是否正在判定，主要用于判定中不能点击重置按钮
    startTime: number
}
interface Props {
    show: boolean;
    canvasWidth: number;
    canvasHeight: number;
    puzzleScale: number;
    sliderSize: number;
    range: number;
    successText: string;
    failText: string;
    sliderText: string;
    imgs: unknown[] | undefined;
}
import {
    ref,
    reactive,
    onMounted,
    onUnmounted,
    computed,
    watch,
    SetupContext,
    toRefs,
    defineComponent
} from "vue";
import { getImage, verify } from "@/service/login";
export default defineComponent({
    emits: ["success", "fail", "close"],
    props: {
        canvasWidth: { type: Number, default: 310 }, // 主canvas的宽
        canvasHeight: { type: Number, default: 160 }, // 主canvas的高
        show: { type: Boolean, default: false }, // 是否出现，由父级控制
        puzzleScale: { type: Number, default: 1 }, // 拼图块的大小缩放比例
        sliderSize: { type: Number, default: 50 }, // 滑块的大小
        range: { type: Number, default: 10 }, // 允许的偏差值
        imgs: {
            type: Array,
        },
        successText: {
            type: String,
            default: "验证通过！",
        },
        failText: {
            type: String,
            default: "验证失败，请重试",
        },
        sliderText: {
            type: String,
            default: "拖动滑块完成拼图",
        },
        aabc: { type: String, default: "拖动滑块完成拼图" },
    },
    setup(props: Props, context: SetupContext) {
        const rangeSlider = ref<HTMLDivElement>();
        // const canvas1 = ref<HTMLCanvasElement>();
        // const canvas2 = ref<HTMLCanvasElement>();
        // const canvas3 = ref<HTMLCanvasElement>();
        const image1 = ref('')
        const image2 = ref('')
        const state = reactive<State>({
            mouseDown: false,
            startWidth: 50,
            startX: 0,
            newX: 0,
            pinX: 0,
            pinY: 0,
            loading: false,
            isCanSlide: false,
            error: false,
            infoBoxShow: false,
            infoText: "",
            infoBoxFail: false,
            timer1: undefined,
            closeDown: false,
            isSuccess: false,
            imgIndex: -1,
            isSubmting: false,
            startTime: 0,
        });
        onMounted(() => {
            document.addEventListener("mousemove", onRangeMouseMove, false);
            document.addEventListener("mouseup", onRangeMouseUp, false);
            document.addEventListener("touchmove", onRangeMouseMove, {
                passive: false,
            });
            document.addEventListener("touchend", onRangeMouseUp, false);
            if (props.show) {
                document.body.classList.add("vue-puzzle-overflow");
                reset();
            }
        });
        onUnmounted(() => {
            // state.timer1 && clearTimeout(state.timer1);
            document.removeEventListener("mousemove", onRangeMouseMove, false);
            document.removeEventListener("mouseup", onRangeMouseUp, false);
            document.removeEventListener("touchmove", onRangeMouseMove);
            document.removeEventListener("touchend", onRangeMouseUp, false);
        });
        // 每次出现都应该重新初始化
        watch(
            () => props.show,
            (newV) => {
                if (newV) {
                    document.body.classList.add("vue-puzzle-overflow");
                    reset();
                } else {
                    // 关闭的时候回到初始状态
                    state.isSubmting = false;
                    state.isSuccess = false;
                    state.infoBoxShow = false;
                    document.body.classList.remove("vue-puzzle-overflow");
                }
            }
        );
        // styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
        const styleWidth = computed(() => {
            const w = state.startWidth + state.newX - state.startX;
            return w < sliderBaseSize.value
                ? sliderBaseSize.value
                : w > props.canvasWidth
                    ? props.canvasWidth
                    : w;
        });
        // 图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
        const puzzleBaseSize = computed(() => {
            return Math.round(
                Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6
            );
        });
        // 处理一下sliderSize，弄成整数，以免计算有偏差
        const sliderBaseSize = computed(() => {
            return Math.max(
                Math.min(
                    Math.round(props.sliderSize),
                    Math.round(props.canvasWidth * 0.5)
                ),
                10
            );
        });
        // 私有-关闭
        const onC = () => {
            if (!state.mouseDown) {
                // state.timer1 && clearTimeout(state.timer1);
                context.emit("close");
            }
        };
        const onCloseMouseDown = () => {
            state.closeDown = true;
        };
        const onCloseMouseUp = () => {
            if (state.closeDown) {
                onC();
            }
            state.closeDown = false;
        };
        // 鼠标按下准备拖动
        const onRangeMouseDown = (e: Event) => {
            if (state.isCanSlide) {
                state.mouseDown = true;
                state.startWidth = rangeSlider.value?.clientWidth ?? 0;
                state.newX =
                    (e as MouseEvent).clientX ||
                    (e as TouchEvent).changedTouches[0].clientX;
                state.startX =
                    (e as MouseEvent).clientX ||
                    (e as TouchEvent).changedTouches[0].clientX;
            }
        };
        // 鼠标移动
        const onRangeMouseMove = (e: Event) => {
            if (state.mouseDown) {
                e.preventDefault();
                state.newX =
                    (e as MouseEvent).clientX ||
                    (e as TouchEvent).changedTouches[0].clientX;
            }
        };
        // 鼠标抬起
        const onRangeMouseUp = () => {
            if (state.mouseDown) {
                state.mouseDown = false;
                submit();
            }
        };
        /**
         * 私有-开始进行
         * @param withCanvas 是否强制使用canvas随机作图,只有图片加载错误后此值才会为真
         */
        const init = (withCanvas = false) => {
            // 防止重复加载导致的渲染错误
            if (state.loading && !withCanvas) {
                return;
            }
            state.loading = true;
            state.isCanSlide = false;
            getImage().then((result) => {
                if (result.data) {
                    image1.value = result.data.image1
                    image2.value = result.data.image2
                    state.loading = false
                    state.isCanSlide = true
                    state.startTime = new Date().getTime()
                }

            })

        };

        const submit = async () => {
            //关闭拖动
            // state.isCanSlide = false;
            state.isSubmting = true;

            const x = state.newX - state.startX;
            const result = await verify({ x, width: props.canvasWidth, time: state.startTime })
            if (result.data?.success) {
                // 成功
                state.infoText = props.successText;
                state.infoBoxFail = false;
                state.infoBoxShow = true;
                state.isCanSlide = false;
                state.isSuccess = true;
                // // 成功后准备关闭
                // if (state.timer1) {
                //     clearTimeout(state.timer1);
                state.timer1 = setTimeout(() => {
                    context.emit('success')
                    state.isSubmting = false;
                    // reset();
                }, 800);
                // }
            } else {
                // 失败
                state.infoText = props.failText;
                state.infoBoxFail = true;
                state.infoBoxShow = true;
                state.isCanSlide = false;
                context.emit("fail", x);
                // // 800ms后重置
                // if (state.timer1) {
                //     clearTimeout(state.timer1);
                setTimeout(() => {
                    state.isSubmting = false;
                    reset();
                }, 800);
                // }
                // state.timer1 && 

            }
        };
        // 重置 - 重新设置初始状态
        const resetState = () => {
            state.infoBoxFail = false;
            state.infoBoxShow = false;
            state.isCanSlide = false;
            state.isSuccess = false;
            state.startWidth = sliderBaseSize.value; // 鼠标点下去时父级的width
            state.startX = 0; // 鼠标按下时的X
            state.newX = 0; // 鼠标当前的偏移X
            init()
        };
        // 重置 - 重新加载
        const reset = () => {
            if (state.isSubmting) {
                return;
            }
            resetState();
            init();
        };
        return {
            rangeSlider,
            // canvas1,
            // canvas2,
            // canvas3,
            styleWidth,
            puzzleBaseSize,
            sliderBaseSize,
            onCloseMouseDown,
            onCloseMouseUp,
            onRangeMouseDown,
            onRangeMouseMove,
            reset,
            ...toRefs(state),
            image1,
            image2
        };
    },
})
</script>
<style lang="less">
.vue-puzzle-vcode {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;

    &.show_ {
        opacity: 1;
        pointer-events: auto;
    }
}

.vue-auth-box_ {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    user-select: none;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

    .auth-body_ {
        position: relative;
        overflow: hidden;
        border-radius: 3px;

        .loading-box_ {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 20;
            opacity: 1;
            transition: opacity 100ms;
            display: flex;
            align-items: center;
            justify-content: center;

            &.hide_ {
                opacity: 0;
                pointer-events: none;

                .loading-gif_ {
                    span {
                        animation-play-state: paused;
                    }
                }
            }

            .loading-gif_ {
                flex: none;
                height: 5px;
                line-height: 0;

                @keyframes load {
                    0% {
                        opacity: 1;
                        transform: scale(1.3);
                    }

                    100% {
                        opacity: 0.2;
                        transform: scale(0.3);
                    }
                }

                span {
                    display: inline-block;
                    width: 5px;
                    height: 100%;
                    margin-left: 2px;
                    border-radius: 50%;
                    background-color: #888;
                    animation: load 1.04s ease infinite;

                    &:nth-child(1) {
                        margin-left: 0;
                    }

                    &:nth-child(2) {
                        animation-delay: 0.13s;
                    }

                    &:nth-child(3) {
                        animation-delay: 0.26s;
                    }

                    &:nth-child(4) {
                        animation-delay: 0.39s;
                    }

                    &:nth-child(5) {
                        animation-delay: 0.52s;
                    }
                }
            }
        }

        .info-box_ {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            line-height: 100px;
            text-align: center;
            overflow: hidden;
            font-size: 30px;
            background-color: #83ce3f;
            opacity: 0;
            transform: translateY(24px);
            transition: all 200ms;
            color: #fff;
            z-index: 10;

            &.show {
                opacity: 0.95;
                transform: translateY(0);
            }

            &.fail {
                background-color: #ce594b;
            }
        }

        .auth-canvas2_ {
            position: absolute;
            top: 0;
            left: 0;
            // width: 60px;
            // height: 100%;
            z-index: 2;
        }

        .auth-canvas3_ {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 600ms;
            z-index: 3;

            &.show {
                opacity: 1;
            }
        }

        .flash_ {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.1);
            z-index: 3;

            &.show {
                transition: transform 600ms;
            }
        }

        .reset_ {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 35px;
            height: auto;
            z-index: 12;
            cursor: pointer;
            transition: transform 200ms;
            transform: rotate(0deg);

            &:hover {
                transform: rotate(-90deg);
            }
        }
    }

    .auth-control_ {
        .range-box {
            position: relative;
            width: 100%;
            background-color: #eef1f8;
            margin-top: 20px;
            border-radius: 3px;
            box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;

            .range-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 14px;
                color: #b7bcd1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                width: 100%;
            }

            .range-slider {
                position: absolute;
                height: 100%;
                width: 50px;
                background-color: rgba(106, 160, 255, 0.8);
                border-radius: 3px;

                .range-btn {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    right: 0;
                    width: 50px;
                    height: 100%;
                    background-color: #fff;
                    border-radius: 3px;
                    box-shadow: 0 0 4px #ccc;
                    cursor: pointer;

                    &>div {
                        width: 0;
                        height: 40%;
                        transition: all 200ms;

                        &:nth-child(2) {
                            margin: 0 4px;
                        }

                        border: solid 1px #6aa0ff;
                    }

                    &:hover,
                    &.isDown {
                        &>div:first-child {
                            border: solid 4px transparent;
                            height: 0;
                            border-right-color: #6aa0ff;
                        }

                        &>div:nth-child(2) {
                            border-width: 3px;
                            height: 0;
                            border-radius: 3px;
                            margin: 0 6px;
                            border-right-color: #6aa0ff;
                        }

                        &>div:nth-child(3) {
                            border: solid 4px transparent;
                            height: 0;
                            border-left-color: #6aa0ff;
                        }
                    }
                }
            }
        }
    }
}

.vue-puzzle-overflow {
    overflow: hidden !important;
}
</style>