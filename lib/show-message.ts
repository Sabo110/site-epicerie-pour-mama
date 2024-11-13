import { toast } from 'sonner';

export function showSuccessMessage(message: string) {
    toast.success(message, {
        duration: 3000,
    });
}

export function showErrorMessage(message: string) {
    toast.error(message, {
        duration: 3000,
    });
}