export default function ({ route, redirect }) {
    if (route.path !== '/auth/signin') {
        if (!$fire.auth.currentUser) {
            //
            return redirect('/auth/signin')
        }
    } else if (route.path === '/auth/signin') {
        if (!$fire.auth.currentUser) {
            //
        } else {
            return redirect('/')
        }
        
    }
}