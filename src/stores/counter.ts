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
    const draw_dell3_select_size = ref("方图") // 绘画dell3尺寸选择
    const draw_dell3_select_picture = ref("高清")// 绘画dell3画质选择
    const draw_num_select = ref("1") //绘画生成数量选择
    const draw_size_select = ref(false) //绘画生成布局变化
    const draw_img1 = ref("") // 绘画结果url1
    const draw_img2 = ref("") // 绘画结果url2
    const draw_img3 = ref("") // 绘画结果url3
    const draw_img4 = ref("") // 绘画结果url4
    const draw_img_load1 = ref(false) // 绘画结果加载中1
    const draw_img_load2 = ref(false) // 绘画结果加载中2
    const draw_img_load3 = ref(false) // 绘画结果加载中3
    const draw_img_load4 = ref(false) // 绘画结果加载中4
    const gallery_img_list = ref([]) // 画廊所有图片url
    const ppt_inp_type_select = ref("1") // PPT输入类型选择
    const ppt_inp = ref("") // PPT输入描述
    const ppt_mod_select = ref("1") // PPT模型选择
    const ppt_theme_select = ref("1") // PPT主题选择
    const ppt_author_inp = ref("") // PPT作者名
    const ppt_notes_select = ref(false) // PPT是否生成演讲备注
    const ppt_path_url = ref("") // PPT生成地址
    const ppt_show_load_status = ref(false) // PPT显示区是否生成中
    const edit_name = ref("")
    const edit_mod = ref("")
    const edit_mod_view = ref("")
    const edit_app = ref("")
    const edit_app_view = ref("")
    const edit_mod_options = ref([])
    const edit_app_options = ref([])
    const edit_temp_select_red_id = ref("")
    const chat_rec_title = ref("") // 对面页面显示页面对话记录选择

    // ------------------工作流页面------------------
    const flow_data = ref({
        "nodes": [{
            id: `start_${Date.now().toString()}`,
            data: {
                label: '',
            },
            type: 'start', // 节点类型
            position: {x: 500, y: 500},
        }, {
            id: `end_${Date.now().toString()}`,
            data: {
                label: '',
            },
            type: 'end', // 节点类型
            position: {x: 800, y: 500},
        }], "edges": [], "position": []
    }) // 页面数据
    const select_modal_node = ref("") // 节点编辑面板选择
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
        draw_num_select,
        draw_size_select,
        draw_img1,
        draw_img2,
        draw_img3,
        draw_img4,
        draw_img_load1,
        draw_img_load2,
        draw_img_load3,
        draw_img_load4,
        gallery_img_list,
        ppt_inp_type_select,
        ppt_inp,
        ppt_mod_select,
        ppt_theme_select,
        ppt_author_inp,
        ppt_notes_select,
        ppt_path_url,
        ppt_show_load_status,
        edit_name,
        edit_mod,
        edit_mod_view,
        edit_app,
        edit_app_view,
        edit_mod_options,
        edit_app_options,
        edit_temp_select_red_id,
        chat_rec_title,
        flow_data,
        select_modal_node,
    }
})
