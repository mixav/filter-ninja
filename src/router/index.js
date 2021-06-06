import Vue from 'vue'
import VueRouter from 'vue-router'
import CharacterList from '@/components/CharacterList'
import DataEditor from '@/components/DataEditor'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        alias: '/CharacterList',
        name: 'CharacterList',
        component: CharacterList
    },
    {
        path: '/DataEditor/*',
        alias: '/DataEditor/*',
        name: 'DataEditor',
        component: DataEditor
    }
]

const router = new VueRouter({
    routes
})

export default router
