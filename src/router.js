import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [{
        path: 'fillArea',
        name: 'fillArea',
        component: () => import('./views/fill/fillArea.vue'),
      },
      {
        path: 'fillRecord',
        name: 'fillRecord',
        component: () => import('./views/fill/fillRecord.vue'),
      },
      {
        path: 'fillJournal',
        name: 'fillJournal',
        component: () => import('./views/fill/fillJournal.vue'),
      },
      {
        path: 'PersonalStatistics',
        name: 'PersonalStatistics',
        component: () => import('./views/Statistical/PersonalStatistics.vue'),
      },
      {
        path: 'departmentStatistical',
        name: 'departmentStatistical',
        component: () => import('./views/Statistical/departmentStatistical.vue'),
      },
      {
        path: 'ProjectStatistics',
        name: 'ProjectStatistics',
        component: () => import('./views/Statistical/ProjectStatistics.vue'),
      },
      {
        path: 'ScientificStatistics',
        name: 'ScientificStatistics',
        component: () => import('./views/Statistical/ScientificStatistics.vue'),
      },
      {
        path: 'ManagementStatistical',
        name: 'ManagementStatistical',
        component: () => import('./views/Statistical/ManagementStatistical.vue'),
      },
      {
        path: 'PersonalDetails',
        name: 'PersonalDetails',
        component: () => import('./views/Details/PersonalDetails.vue'),
      },
        {
          path: 'departmentDetails',
          name: 'departmentDetails',
          component: () => import('./views/Details/departmentDetails.vue'),
        },
      {
        path: 'ProjectDetails',
        name: 'ProjectDetails',
        component: () => import('./views/Details/ProjectDetails.vue'),
      },
      {
        path: 'ScientificDetails',
        name: 'ScientificDetails',
        component: () => import('./views/Details/ScientificDetails.vue'),
      },
      {
        path: 'ManagementDetails',
        name: 'ManagementDetails',
        component: () => import('./views/Details/ManagementDetails.vue'),
      },
      {
        path: 'ProjectReport_form',
        name: 'ProjectReport_form',
        component: () => import('./views/ProjectReport/form.vue'),
      },
      {
        path: 'ProjectReport_graphics',
        name: 'ProjectReport_graphics',
        component: () => import('./views/ProjectReport/graphics.vue'),
      },
      {
        path: 'ProjectReport_DIYform',
        name: 'ProjectReport_DIYform',
        component: () => import('./views/ProjectReport/DIYform.vue'),
      },
      {
        path: 'ScientificReport_form',
        name: 'ScientificReport_form',
        component: () => import('./views/ScientificReport/form.vue'),
      },
      {
        path: 'ScientificReport_graphics',
        name: 'ScientificReport_graphics',
        component: () => import('./views/ScientificReport/graphics.vue'),
      },
        {
          path: 'ScientificReport_DIYform',
          name: 'ScientificReport_DIYform',
          component: () => import('./views/ScientificReport/DIYform.vue'),
        },
      {
        path: 'CustomReport_form',
        name: 'CustomReport_form',
        component: () => import('./views/CustomReport/form.vue'),
      },
      {
        path: 'CustomReport_graphics',
        name: 'CustomReport_graphics',
        component: () => import('./views/CustomReport/graphics.vue'),
      },
      {
        path: 'CustomReport_DIYform',
        name: 'CustomReport_DIYform',
        component: () => import('./views/CustomReport/DIYform.vue'),
      },
      {
        path: 'DataDictionary',
        name: 'DataDictionary',
        component: () => import('./views/SystemManagement/DataDictionary.vue'),
      },
      {
        path: 'APISet',
        name: 'APISet',
        component: () => import('./views/SystemManagement/APISet.vue'),
      },
      {
        path: 'CharacterSet',
        name: 'CharacterSet',
        component: () => import('./views/SystemManagement/CharacterSet.vue'),
      },
      {
        path: 'GuardManagement',
        name: 'GuardManagement',
        component: () => import('./views/SystemManagement/GuardManagement.vue'),
      },
      {
        path: 'VehicleManagement',
        name: 'VehicleManagement',
        component: () => import('./views/SystemManagement/VehicleManagement.vue'),
      },
      {
        path: 'BusinesstripManangment',
        name: 'BusinesstripManangment',
        component: () => import('./views/SystemManagement/BusinesstripManangment.vue'),
      },
      {
        path: 'PageManagement',
        name: 'PageManagement',
        component: () => import('./views/SystemManagement/PageManagement.vue'),
      },
      {
        path: 'PermissionsSet',
        name: 'PermissionsSet',
        component: () => import('./views/SystemManagement/PermissionsSet.vue'),
      },
      {
        path: 'PlanSet',
        name: 'PlanSet',
        component: () => import('./views/SystemManagement/PlanSet.vue'),
      },
      {
        path: 'ScientificDataImport',
        name: 'ScientificDataImport',
        component: () => import('./views/SystemManagement/ScientificDataImport.vue'),
      },
      ],
    },
  ],
});
