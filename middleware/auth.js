// export default function ({ route, redirect, store }) {
//     if (route.path !== '/auth/signin') {
//         if (!$fire.auth.currentUser) {
//             //
//             return redirect('/auth/signin')
//         }
//     } else if (route.path === '/auth/signin') {
//         if (!$fire.auth.currentUser) {
//             //
//         } else {
//             return redirect('/')
//         }
        
//     }

//     if (!store.state.user) {
//         redirect('/'); 
//     }
// }
// export default function ({ store, redirect }) {
//     // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่ลงทะเบียน (logged in) หรือไม่
//     if (!store.state.user) {
//       // ถ้าไม่ได้ login ให้ redirect ไปยังหน้าที่กำหนด
//       redirect('/'); // แก้ไขเส้นทางตามที่คุณต้องการ
//     }
//   }