export default [{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/Default.vue'),
  meta : {
    action: 'manage',
    resource: 'dashboard',
  }
}]
