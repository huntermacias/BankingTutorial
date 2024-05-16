import { HeaderLogo } from '@/components/HeaderLogo';
import { Navigation } from '@/components/Navigation';
import { UserButton, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { WelcomeMessage } from './WelcomeMessage';

const Header = () => {
    return (
        <header className='bg-gradient-to-r from-teal-800 to-blue-800 p-8 mb-16 fixed top-0 w-full z-0'>
            <div className='max-w-screen-2xl mx-auto flex justify-between items-center'>
                <div className='flex items-center gap-x-4 lg:gap-x-16'>
                    <HeaderLogo />
                    <Navigation />
                </div>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl='/' />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className='h-8 w-8 animate-spin text-light-gray' />
                </ClerkLoading>
            </div>
            <WelcomeMessage />
        </header>
    );
}

export default Header;