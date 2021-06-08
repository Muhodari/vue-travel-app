import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props:true
  },  
  {
    path:"/destination/:slug",
    name:"DestinationDetails",
    props:true,
    component:()=>import(/* webpackChunkName: "DestinationDetails" */"../views/DestinationDetails"),
    children:[
      {
        path:":experienceSlug",
        name:"experienceDetails",
        props:true,
        component:()=>import(/* webpackChunkName: "ExperienceDetails" */"../views/ExperienceDetails")
      }
    ],
    beforeEnter:(to,from,next)=>{
      const exits=store.destinations.find(
        destination=>destination.slug ===to.params.slug)
        
        if(exits){
          next()
        }else{
          next({name:'notFound'})
        }
    }
  },
  {
    path:"/user",
    name:"user",
    component:()=>import(/* webpackChunkName:"User"*/"../views/User"),
    meta:{requiresAuth:true}
  }
,
{
  path:"/login",
  name:"login",
  component:()=>import(/* webpackChunkName:"Login"*/"../views/Login")

},
{
  path:"/404",
  alias:"*",
  name:"notFound",
  component:()=>import(/* webpackChunkName: "NotFound" */"../views/NotFound")
}
];


const router = new VueRouter({
  mode:"history",
  linkExactActiveClass:"vue-school-active-class",
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{

      const postion={};
      if(to.hash){
        postion.selector=to.hash;

        if(to.hash ==="#experience"){
          position.offset={y:140};
        } 

        if(document.querySelector(to.hash)){
          return postion;
        }
        return false;
      }
    }
  },
  routes,
});

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
if(!store.user){
  next({
    name:"login"
  });
}
else{
next();
}
  }else{
    next();
  }

})
export default router;
