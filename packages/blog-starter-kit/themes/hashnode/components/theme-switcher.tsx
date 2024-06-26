//components/theme-switcher.tsx
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import MoonSVG from './icons/svgs/MoonSVG';
import SunSVG from './icons/svgs/SunSVG';
import CommonHeaderIconBtn from './common-header-icon-btn';

const ThemeSwitch = () => {
const [mounted, setMounted] = useState(false);
const { theme, setTheme } = useTheme();
useEffect(() => {
setMounted(true);
}, []);
if (!mounted) {
return null;
}
const handleClick = () => {
setTheme(theme === 'light' ? 'dark' : 'light');
};
return (
<CommonHeaderIconBtn handleClick={handleClick} variant="theme">
<SunSVG className="h-[1.5rem] w-[1.3rem] dark:hidden" />
<MoonSVG className="hidden h-5 w-5 dark:block" />
</CommonHeaderIconBtn>
);
};

export default ThemeSwitch;
