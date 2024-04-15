// components/publication-logo.tsx

import CustomImage from './custom-image';
import Link from 'next/link';
import { resizeImage, getBlurHash } from '../utils/image';
import { Preferences, User, Maybe, PublicationFragment } from '../generated/graphql';
import { twJoin } from 'tailwind-merge';
import { generateBlogTitleWithoutDisplayTitle } from '../utils/commonUtils';
import { useTheme } from 'next-themes';

type PublicationLogoProps = {
  // ... (rest of the props)
};

const textStyles = {
  // ... (rest of the styles)
};

const logoSizes = {
  // ... (rest of the sizes)
};

const CustomLogo = ({ publication, logoSrc, darkLogoSrc, size = 'lg', isPostPage }: {
  publication: Pick<PublicationFragment, 'title'> & {
    author: Pick<User, 'name'>;
  };
  logoSrc: Maybe<string> | undefined;
  darkLogoSrc: Maybe<string> | undefined;
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  isPostPage?: boolean | null;
}) => {
  const { theme } = useTheme();
  const blogTitle = generateBlogTitleWithoutDisplayTitle(publication);

  return (
    <h1 className="blog-main-logo">
      <Link
        className={twJoin(
          'blog-logo focus-ring-base flex flex-row items-center', 'focus-ring-colors-base',
          logoSizes[size],
        )}
        aria-label={`${blogTitle} home page`}
        href={`/${isPostPage ? '?source=top_nav_blog_home' : ''}`}
      >
        <CustomImage
          priority
          className="block w-full"
          src={resizeImage(theme === 'dark' ? darkLogoSrc : logoSrc, { w: 903.95, h: 250, c: 'thumb' })}
          originalSrc={theme === 'dark' ? darkLogoSrc || '' : logoSrc || ''}
          width={1000}
          height={250}
          alt={blogTitle}
        />
      </Link>
    </h1>
  );
};

const DefaultLogo = ({ publication, size = 'lg', withProfileImage = false, isPostPage }: {
  // ... (rest of the props)
}) => {
  // ... (rest of the DefaultLogo component)
};

function PublicationLogo(props: PublicationLogoProps) {
  const { publication, size, withProfileImage, isPostPage } = props;
  const { preferences } = publication;

  if (!publication) {
    return null;
  }
  const useLogo = false || preferences.logo;
  if (useLogo) {
    const logoSrc = preferences.logo;
    const darkLogoSrc = preferences.darkMode?.logo;
    return (
      <CustomLogo
        publication={publication}
        logoSrc={logoSrc}
        darkLogoSrc={darkLogoSrc}
        size={size}
        isPostPage={isPostPage}
      />
    );
  }
  return (
    <DefaultLogo
      publication={publication}
      size={size}
      withProfileImage={withProfileImage}
      isPostPage={isPostPage}
    />
  );
}

export default PublicationLogo;
