import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const selectedKeys = ref<string[]>(['1']); // 左侧导航栏选择
    const recording = ref([]); // 对话记录
    const search_recording = ref([]); // 搜索对话记录
    const contents = ref([]) // 内容记录
    const login_status = ref() // 登陆页面
    const login_page = ref("1") // 登录or注册
    const user_id = ref("") // 用户id
    const user_name = ref("") // 用户名称
    const img_head = ref("") // 用户头像地址
    const chat_mode_name = ref("") // 当前选择对话模型名称
    const chat_mode_ver = ref("") // 当前选择对话模型版本
    const draw_mode_name = ref("") // 当前选择绘画模型名称
    const draw_mode_ver = ref("") // 当前选择绘画模型版本
    const selected_item = ref("") // 当前选择对话
    const chat_api = ref("") // 内容区选择模型
    const chat_img_head = ref("") // 内容区选择模型头像
    const chat_mod_img_head = ref("") // 内容区选择角色头像
    const chat_mod_name = ref("") // 内容区选择角色名字
    const app_default_data = ref([]) // 应用预设数据
    const app_user_data = ref([]) // 应用自定义数据
    const draw_mod_select = ref("1") // 绘画模型选择
    const draw_inp = ref("") // 绘画图像描述输入
    const draw_dell3_select_size = ref("1024x1024") // 绘画dell3尺寸选择
    const draw_dell3_select_picture = ref("普通")// 绘画dell3画质选择
    const draw_img1 = ref("") // 绘画结果url1
    return {
        selectedKeys,
        recording,
        search_recording,
        contents,
        login_status,
        login_page,
        user_id,
        user_name,
        img_head,
        chat_mode_name,
        chat_mode_ver,
        draw_mode_name,
        draw_mode_ver,
        selected_item,
        chat_api,
        chat_img_head,
        chat_mod_img_head,
        chat_mod_name,
        app_default_data,
        app_user_data,
        draw_mod_select,
        draw_inp,
        draw_dell3_select_size,
        draw_dell3_select_picture,
        draw_img1,
    }
})
