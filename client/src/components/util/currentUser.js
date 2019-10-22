import loginUser from '../splash/login_modal';
import registerUser from '../splash/register_modal';

const currentUser = {};

if(loginUser) {
    currentUser = loginUser;
} else {
    currentUser = registerUser;
}

export default currentUser;