import {main, park} from '@/api/index'
//首页
export function homePageApi(params) {
    return park({
        url:`/apphomepage/HomePage`,
        method: 'POST',
        data:params
    })
}

//首页分类
export function HomePagebottomApi(params) {
    return park({
        url:`/apphomepage/HomePagebottom`,
        method: 'POST',
        data:params,
        loading:'shouyedibu'
    })
}