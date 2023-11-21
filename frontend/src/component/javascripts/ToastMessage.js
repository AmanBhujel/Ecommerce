import { toast } from 'sonner';

function ToastMessage(type, message) {
    if (type === 'success') {
        return toast.success(message)
    }
    return toast.error(message)
};
export default ToastMessage;