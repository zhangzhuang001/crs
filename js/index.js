$(function () {
    init();

    let $plan = $.Callbacks();

    $plan.add((_, baseInfo) => {
        console.log(baseInfo)
        $('.baseBox>span').html(`你好,${baseInfo.name || ''}`)
    })

    $plan.add((power) => {
        console.log('渲染菜单：', power)
    })
    //退出登录
    $('.baseBox>a').click(async function () {
        console.log('------------')
        let result = await axios.get('/user/signout')
        if (result.code == 0) {
            window.location.href = 'login.html'
            return;
        }
        alert('退出失败，请稍后再试')
    })

    async function init() {
        let result = await axios.get('/user/login');
        //console.log(result)
        if (result.code != 0) {
            alert('您还没有登录，请先登录')
            window.location.href = 'login.html';
            return;
        }
        let [power, baseInfo] = await axios.all([
            axios.get('/user/power'),
            axios.get('/user/info')
        ])
        baseInfo.code === 0 ? baseInfo = baseInfo.data : null;
        $plan.fire(power, baseInfo)
    }
})