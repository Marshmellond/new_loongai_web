import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useCounterStore = defineStore('counter', () => {
    const selectedKeys = ref<string[]>(['0']); // 左侧导航栏选择
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
    const chat_emotion_status = ref(false) // 对话页面情感分析开关
    const chat_put_img_list = ref([]) // 对话页面图片上传
    const ppt_data_list = ref([]) // PPT历史对话数据
    const ppt_data_select = ref("") // PPT对话选择
    const chat_put_file_list = ref([]) // 对话页面文件上传列表
    const app_alter_mod_open = ref(false) // 应用页面修改模型面板开关
    const app_alter_mod_data = ref([]) // 应用页面修改模型面板数据
    const music_url_path1 = ref("") // 音乐页面链接1
    const music_url_path2 = ref("") // 音乐页面链接2
    const music_show_load_status = ref(false) // 音乐页面生成中
    const music_generate_type_select = ref("1") // 音乐页面生成模式选择
    const music_inp = ref("") // 音乐页面输入内容
    const music_ai_mod_select = ref("1") // 音乐页面模型选择
    const music_type_select = ref("1") // 音乐页面生成类型选择
    const music_name = ref("") // 音乐页面歌曲名称
    const music_qf = ref("") // 音乐页面歌曲曲风
    const music_ys = ref("") // 音乐页面歌曲音色
    const music_xlfzd = ref("") // 音乐页面歌曲旋律复杂度
    const music_yysc = ref("") // 音乐页面歌曲音乐时长
    const music_dyts = ref("") // 音乐页面歌曲地域特色
    const music_data_list = ref([]) // 音乐历史对话数据
    const music_data_select = ref("") // 音乐对话选择
    const pen_generate_type_select = ref("1") // 写作页面生成模式选择
    const pen_theme_inp = ref("") // 写作页面主题输入
    const pen_content_inp = ref("") // 写作页面工作内容输入
    const pen_kpi_inp = ref("") // 写作页面工作业绩输入
    const pen_type = ref("1") // 写作页面改写/扩写选择
    const pen_ai_content = ref("") // 写作页面AI生成结果
    const pen_ai_content_markdown = ref("") // 写作页面AI生成结果markdown格式
    const pen_show_load_status = ref(false) // 写作页面AI生成封面加载
    const pen_chat_status_bool = ref(false) // 写作页面AI生成加载
    const mind_inp = ref("") // 导图页面主题输入
    const mind_ai_content = ref("# 项目规划管理\n" +
        "\n" +
        "## 1. 项目范围规划\n" +
        "- 界定项目的目标与范围\n" +
        "- 制定项目的工作分解结构（WBS）\n" +
        "- 确定项目的可交付成果\n" +
        "\n" +
        "## 2. 项目进度规划\n" +
        "- 制定项目的时间计划\n" +
        "- 确定项目的关键路径\n" +
        "- 编制项目进度表\n" +
        "\n" +
        "## 3. 项目成本管理\n" +
        "- 估算项目成本\n" +
        "- 制定项目预算\n" +
        "- 控制项目成本\n" +
        "\n" +
        "## 4. 风险管理\n" +
        "- 识别项目风险\n" +
        "- 评估和优先处理风险\n" +
        "- 制定风险应对措施\n" +
        "\n" +
        "## 5. 质量管理\n" +
        "- 确定项目的质量标准\n" +
        "- 进行质量保证和控制\n" +
        "- 反馈与改进\n" +
        "\n" +
        "## 6. 沟通管理\n" +
        "- 制定沟通计划\n" +
        "- 确定沟通频率和形式\n" +
        "- 确保沟通高效顺畅\n" +
        "\n" +
        "## 7. 人力资源管理\n" +
        "- 人员需求规划\n" +
        "- 团队建设和发展\n" +
        "- 岗位职责和权责明确\n" +
        "\n" +
        "## 8. 采购管理\n" +
        "- 制定采购计划\n" +
        "- 确定采购方式和供应商\n" +
        "- 履行采购合同\n" +
        "\n" +
        "## 9. 变更管理\n" +
        "- 处理项目变更请求\n" +
        "- 评估变更影响\n" +
        "- 控制变更范围\n" +
        "\n" +
        "## 10. 项目收尾\n" +
        "- 完成项目验收\n" +
        "- 总结项目经验教训\n" +
        "- 归档相关文档\n" +
        "\n" +
        "以上是项目规划管理的主要内容。") // 导图页面生成结果
    const mind_chat_status_bool = ref(false) // 导图页面AI生成加载
    const mind_svgRef = ref("") // 导图页面思维导图生成数据
    const translate_inp = ref("") // 翻译页面翻译内容
    const translate_select = ref("1") // 翻译页面翻译语言选择
    const translate_diy = ref("") // 翻译页面翻译语言自定义
    const translate_ai_content_markdown = ref("") // 翻译页面AI生成结果markdown格式
    const translate_ai_content = ref("") // 翻译页面AI生成结果
    const translate_show_load_status = ref(false) // 翻译页面AI生成封面加载
    const translate_chat_status_bool = ref(false) // 翻译页面AI生成加载

    const plan_inp = ref("") // 教案页面翻译内容
    const plan_select = ref("") // 教案页面翻译语言选择
    const plan_diy = ref("") // 教案页面翻译语言自定义
    const plan_ai_content_markdown = ref("") // 教案页面AI生成结果markdown格式
    const plan_ai_content = ref("") // 教案页面AI生成结果
    const plan_show_load_status = ref(false) // 教案页面AI生成封面加载
    const plan_chat_status_bool = ref(false) // 教案页面AI生成加载

    const file_inp_data = ref({"content": "", "name": "", "type": ""}) // 文件页面上传文件数据
    const file_ai_content_markdown = ref("") // 文件页面AI生成结果markdown格式
    const file_ai_content = ref("") // 文件页面AI生成结果
    const file_show_load_status = ref(false) // 文件页面AI生成封面加载
    const file_chat_status_bool = ref(false) // 文件页面AI生成加载

    const topic_subject_inp = ref("") // 题目页面年级科目
    const topic_theme_inp = ref("") // 题目页面题目主题
    const topic_type_inp = ref("") // 题目页面题目类型
    const topic_num_inp = ref("3") // 题目页面题目数量
    const topic_ai_content_markdown = ref("") // 题目页面AI生成结果markdown格式
    const topic_ai_content = ref("") // 题目页面AI生成结果
    const topic_show_load_status = ref(false) // 题目页面AI生成封面加载
    const topic_chat_status_bool = ref(false) // 题目页面AI生成加载

    const ass_inp_data = ref({"content": "", "name": "", "type": ""}) // 分析页面上传文件数据
    const ass_ai_clean = ref("") // 分析页面数据清洗
    const ass_ai_ass = ref("") // 分析页面数据分析
    const ass_ai_vis = ref("") // 分析页面数据可视化
    const ass_ai_content = ref("");  // 分析页面AI生成结果
    const ass_ai_echarts = ref() // 分析页面echarts图
    const ass_show_load_status = ref(false) // 分析页面AI生成封面加载


    // ------------------工作流页面------------------
    const flow_data = ref() // 页面数据
    const flow_data_list = ref([]) // 历史记录
    const flow_data_select = ref("") //对话选择
    const selectedNode = ref(null) // 选择node
    const selectedEdge = ref(null) // 选择edge
    const edit_start = ref(true) // 是否打开编辑面板
    const select_modal_node = ref("") // 节点编辑面板选择
    const select_modal_node2 = ref(false) // 节点编辑面板选择2
    const variable_data = ref() // 节点编辑面板选择2 变量临时存储
    const select_variable_data = ref() // 节点编辑面板选择2 添加或修改
    const start_edit_open = ref(false) // 开始节点编辑按钮开启
    const start_edit_open2 = ref(false) // 开始节点编辑按钮开启2
    const ai_edit_open = ref(false) // Ai节点编辑按钮开启
    const end_edit_open = ref(false) // 结束节点编辑按钮开启
    const reply_edit_open = ref(false) // 问题分类器节点编辑按钮开启
    const if_edit_open = ref(false) // 判断器节点编辑按钮开启
    const var_edit_open = ref(false) // 变量更新节点编辑按钮开启
    const note_edit_open = ref(false) // 注释节点编辑按钮开启
    const ai_node_data = ref({}) // Ai节点选中的数据
    const end_node_data = ref({}) // 结束节点选中的数据
    const reply_node_data = ref({}) // 问题分类器节点选中的数据
    const if_node_data = ref({}) // 判断器节点选中的数据
    const var_node_data = ref({}) // 变量更新节点选中的数据
    const note_node_data = ref({}) // 注释节点选中的数据
    const edit_mod_img_options = ref([]) // 模型头像
    const edit_app_img_options = ref([]) // 应用头像
    const input_options = ref([]) // Ai节点选择变量
    const right_select_key = ref("1") // 运行界面标签页选择
    const flow_data_status = ref(false) //工作流页面显示
    const flow_add_ai_max_id = ref() // AI节点最大增加ID
    const flow_add_reply_max_id = ref() // 问题分类器节点最大增加ID
    const flow_add_if_max_id = ref() // 判断器节点最大增加ID
    const flow_add_var_max_id = ref() // 变量更新节点最大增加ID
    const flow_add_note_max_id = ref() // 注释节点最大增加ID
    const flow_if_condition_list = ref([
        {value: "等于", label: "等于"},
        {value: "不等于", label: "不等于"},
        {value: "包含", label: "包含"},
        {value: "不包含", label: "不包含"},
        {value: "为空", label: "为空"},
        {value: "不为空", label: "不为空"},
        {value: "开始为", label: "开始为"},
        {value: "结束为", label: "结束为"},
        {value: "长度等于", label: "长度等于"},
        {value: "长度不等于", label: "长度不等于"},
        {value: "长度大于", label: "长度大于"},
        {value: "长度大于等于", label: "长度大于等于"},
        {value: "长度小于", label: "长度小于"},
        {value: "长度小于等于", label: "长度小于等于"},
    ]) //判断器条件
    const workflow_seed_load = ref(false) // 工作流运行加载动画
    const workflow_result_open = ref(true) // 放大查看结果
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
        flow_data_list,
        flow_data_select,
        selectedNode,
        edit_start,
        select_modal_node,
        select_modal_node2,
        selectedEdge,
        variable_data,
        select_variable_data,
        start_edit_open,
        start_edit_open2,
        ai_edit_open,
        end_edit_open,
        reply_edit_open,
        if_edit_open,
        var_edit_open,
        note_edit_open,
        ai_node_data,
        end_node_data,
        reply_node_data,
        if_node_data,
        var_node_data,
        note_node_data,
        edit_mod_img_options,
        edit_app_img_options,
        input_options,
        right_select_key,
        flow_data_status,
        flow_add_ai_max_id,
        flow_add_reply_max_id,
        flow_add_if_max_id,
        flow_add_var_max_id,
        flow_add_note_max_id,
        flow_if_condition_list,
        workflow_seed_load,
        workflow_result_open,
        chat_emotion_status,
        chat_put_img_list,
        ppt_data_list,
        ppt_data_select,
        chat_put_file_list,
        app_alter_mod_open,
        app_alter_mod_data,
        music_generate_type_select,
        music_inp,
        music_ai_mod_select,
        music_type_select,
        music_url_path1,
        music_url_path2,
        music_show_load_status,
        music_name,
        music_qf,
        music_ys,
        music_xlfzd,
        music_yysc,
        music_dyts,
        music_data_list,
        music_data_select,
        pen_generate_type_select,
        pen_theme_inp,
        pen_content_inp,
        pen_kpi_inp,
        pen_type,
        pen_ai_content,
        pen_ai_content_markdown,
        pen_show_load_status,
        pen_chat_status_bool,
        mind_inp,
        mind_ai_content,
        mind_chat_status_bool,
        mind_svgRef,
        translate_inp,
        translate_select,
        translate_diy,
        translate_ai_content_markdown,
        translate_ai_content,
        translate_show_load_status,
        translate_chat_status_bool,
        plan_inp,
        plan_select,
        plan_diy,
        plan_ai_content_markdown,
        plan_ai_content,
        plan_show_load_status,
        plan_chat_status_bool,
        file_inp_data,
        file_ai_content_markdown,
        file_ai_content,
        file_show_load_status,
        file_chat_status_bool,
        topic_subject_inp,
        topic_theme_inp,
        topic_type_inp,
        topic_num_inp,
        topic_ai_content_markdown,
        topic_ai_content,
        topic_show_load_status,
        topic_chat_status_bool,
        ass_inp_data,
        ass_ai_clean,
        ass_ai_ass,
        ass_ai_vis,
        ass_ai_content,
        ass_ai_echarts,
        ass_show_load_status,
    }
})