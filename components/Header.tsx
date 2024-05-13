import { HeaderLogo } from '@/components/HeaderLogo';
import { Navigation } from '@/components/Navigation';
import { UserButton, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { WelcomeMessage } from './WelcomeMessage';


const Header = () => {
    return (
        <header className='bg-gradient-to-r from-violet-950 to-black/40 p-3'>
            <div className='max-w-screen-2xl mx-auto flex justify-between mr-6'>

                <div className='flex items-center justify-start'>
                    <div className='flex items-center gap-x-4 lg:gap-x-16'>
                        <HeaderLogo />
                        <Navigation />
                    </div>
                </div>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl='/' />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className='size-8 animate-spin text-slate-400' />
                </ClerkLoading>
            </div>
            <WelcomeMessage />
        </header>
    );
}

export default Header;
