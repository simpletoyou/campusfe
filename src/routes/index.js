/*
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
 * @LastEditTime: 2019-10-24 11:09:10
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/main.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: '/organization/login',
            //component: () => import('@/organization/login')
        },
        {
            path: "/organization/login",
            component: () => import('@/organization/login')
        },
        {
            path: "/main",
            name: Main,
            component: Main,
            children: [
                {
                    path: "/myTeam",
                    component: () => import('@/user/myTeam')
                    
                },
                {
                    path: "/addTeam",
                    component: () => import('@/user/addTeam')
                },
              /*   {
                    path: "/editInfo",
                    component: () => import('@/user/editInfo')
                }, */

                {
                    path: "/activity",
                    component: () => import('@/activity')
                },
                {
                    path: "/activityDetails/:id",
                    component: () => import('@/activity/activityDetails')
                },
                {
                    path: "/editActivity/:id",
                    component: () => import('@/activity/editActivity')
                },
                {
                    path: "/addActivity",
                    component: () => import('@/activity/addActivity')
                },


                {
                    path: "/organization",
                    component: () => import('@/organization')
                },
                {
                    path: "/addOrgan",
                    component: () => import('@/organization/addOrgan')
                },
                {
                    path: "/editOrgan/:id",
                    component: () => import('@/organization/editOrgan')
                },
                {
                    path: "/organDetails/:id",
                    component: () => import('@/organization/organDetails')
                },


                {
                    path: "/icon",
                    component: () => import('@/icon')
                },
                {
                    path: "/addIcon",
                    component: () => import('@/icon/addIcon')
                },
                {
                    path: "/editIcon/:id",
                    component: () => import('@/icon/editIcon')
                },
                {
                    path: "/iconDetails/:id",
                    component: () => import('@/icon/iconDetails')
                },


                {
                    path: "/banner",
                    component: () => import('@/banner')
                },
                {
                    path: "/addBanner",
                    component: () => import('@/banner/addBanner')
                },
                {
                    path: "/editBanner/:id",
                    component: () => import('@/banner/editBanner')
                },
                {
                    path: "/bannerDetails/:id",
                    component: () => import('@/banner/bannerDetails')
                },


                {
                    path: "/second_hand",
                    component: () => import('@/second_hand')
                },
                {
                    path: "/addSecond",
                    component: () => import('@/second_hand/addSecond')
                },
                {
                    path: "/editSecond/:id",
                    component: () => import('@/second_hand/editSecond')
                },
                {
                    path: "/secondDetails/:id",
                    component: () => import('@/second_hand/secondDetails')
                },


                {
                    path: "/lost",
                    component: () => import('@/lost')
                },

                {
                    path: "/addLost",
                    component: () => import('@/lost/addLost')
                },
                {
                    path: "/editLost/:id",
                    component: () => import('@/lost/editLost')
                },
                {
                    path: "/lostDetails/:id",
                    component: () => import('@/lost/lostDetails')
                }
            ]
        },
        /* {
             path: "/notFound",
             name: NotFound,
             component: NotFound
         },*/

    ]
})

export default router