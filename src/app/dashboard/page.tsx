import { auth } from '@/auth';
import { logout } from '@/lib/actions';

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        return (
            <main className='flex min-h-screen flex-col items-center justify-center p-24'>
                <h1 className='text-2xl font-bold'>
                    You are not authorized to view this page.
                </h1>
            </main>
        );
    }

    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
                <h1 className='mb-4 text-center text-3xl font-bold'>
                    Welcome to your Dashboard
                </h1>
                <p className='mb-6 text-center text-lg text-gray-700'>
                    Hello, <span className='font-semibold'>{session.user.email || 'User'}</span>!
                </p>

                {/* Logout Button Form */}
                <form action={logout}>
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700'
                    >
                        Log Out
                    </button>
                </form>
            </div>
        </main>
    );
}