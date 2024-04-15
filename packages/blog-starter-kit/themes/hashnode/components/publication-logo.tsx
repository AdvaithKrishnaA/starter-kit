// // components/publication-logo.tsx

// import { useTheme } from 'next-themes';
// import CustomImage from './custom-image';
// import Link from 'next/link';
// import { resizeImage, getBlurHash } from '../utils/image';
// import { Preferences, User, Maybe, PublicationFragment } from '../generated/graphql';
// import { twJoin } from 'tailwind-merge';
// import { generateBlogTitleWithoutDisplayTitle } from '../utils/commonUtils';

// type PublicationLogoProps = {
//   publication: Pick<PublicationFragment, 'title' | 'isTeam'> & {
//     author: Pick<User, 'username' | 'name' | 'profilePicture'>;
//   } & {
//     preferences: Pick<Preferences, 'logo' | 'darkMode'>;
//   };
//   size?: 'xs' | 'sm' | 'lg' | 'xl';
//   withProfileImage?: boolean;
//   isPostPage?: boolean | null;
// };

// const textStyles = {
//   xs: 'text-base text-left',
//   sm: 'text-lg md:text-xl text-left',
//   lg: 'text-xl md:text-2xl text-left',
//   xl: 'text-2xl text-center',
// } as const;

// const logoSizes = {
//   xs: 'w-44',
//   sm: 'w-44',
//   lg: 'w-64',
//   xl: 'w-64',
// } as const;

// const CustomLogo = ({ publication, logoSrc, size = 'lg', isPostPage }: {
//   publication: Pick<PublicationFragment, 'title'> & {
//     author: Pick<User, 'name'>;
//   } & {
//     preferences: Pick<Preferences, 'darkMode'>;
//   };
//   logoSrc: Maybe<string> | undefined;
//   size?: 'xs' | 'sm' | 'lg' | 'xl';
//   isPostPage?: boolean | null;
// }) => {
//   const { theme } = useTheme();
//   const blogTitle = generateBlogTitleWithoutDisplayTitle(publication);
//   const darkLogoSrc = publication.preferences.darkMode?.logo;

//   return (
//     <h1 className="blog-main-logo">
//       <Link
//         className={twJoin(
//           'blog-logo focus-ring-base flex flex-row items-center', 'focus-ring-colors-base',
//           logoSizes[size],
//         )}
//         aria-label={`${blogTitle} home page`}
//         href={`/${isPostPage ? '?source=top_nav_blog_home' : ''}`}
//       >
//         <CustomImage
//           priority
//           className="block w-full"
//           src={resizeImage(theme === 'dark' && darkLogoSrc ? darkLogoSrc : logoSrc, { w: 903.95, h: 250, c: 'thumb' })}
//           originalSrc={theme === 'dark' && darkLogoSrc ? darkLogoSrc : logoSrc || ''}
//           width={1000}
//           height={250}
//           alt={blogTitle}
//         />
//       </Link>
//     </h1>
//   );
// };

// const DefaultLogo = ({ publication, size = 'lg', withProfileImage = false, isPostPage }: {
//   publication: Pick<PublicationFragment, 'title' | 'isTeam'> & {
//     author: Pick<User, 'username' | 'name' | 'profilePicture'>;
//   } & {
//     preferences: Pick<Preferences, 'logo' | 'darkMode'>;
//   };
//   size?: 'xs' | 'sm' | 'lg' | 'xl';
//   withProfileImage?: boolean;
//   isPostPage?: boolean | null;
// }) => {
//   const blogTitle = generateBlogTitleWithoutDisplayTitle(publication);

//   return (
//     <h1
//       className={twJoin(
//         'blog-title',
//         textStyles[size],
//         'break-words font-heading font-semibold leading-snug md:font-bold', 'dark:text-white',
//       )}
//     >
//       <Link
//         href={`/${isPostPage ? '?source=top_nav_blog_home' : ''}`}
//         className={twJoin(
//           'focus-ring-base flex flex-row items-center', 'focus-ring-colors-base',
//         )}
//         aria-label={`${blogTitle} home page`}
//       >
//         {!publication.isTeam && publication.author.profilePicture && withProfileImage && (
//           <div className="mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
//             <CustomImage
//               priority
//               src={resizeImage(publication.author.profilePicture, { w: 400, h: 400, c: 'face' })}
//               originalSrc={publication.author.profilePicture}
//               blurDataURL={getBlurHash(resizeImage(publication.author.profilePicture, { w: 400, h: 400, c: 'face' }))}
//               width={400}
//               height={400}
//               alt={publication.author.name}
//             />
//           </div>
//         )}
//         {blogTitle}
//       </Link>
//     </h1>
//   );
// };

// function PublicationLogo(props: PublicationLogoProps) {
//   const { publication, size, withProfileImage, isPostPage } = props;
//   const { preferences } = publication;
//   const { theme } = useTheme();

//   if (!publication) {
//     return null;
//   }
//   const useLogo = false || preferences.logo;
//   if (useLogo) {
//     const darkLogoSrc = preferences.darkMode?.logo;
//     const logoSrc = preferences.logo;
//     return (
//       <CustomLogo
//         publication={publication}
//         logoSrc={theme === 'dark' ? darkLogoSrc : logoSrc}
//         size={size}
//         isPostPage={isPostPage}
//       />
//     );
//   }
//   return (
//     <DefaultLogo
//       publication={publication}
//       size={size}
//       withProfileImage={withProfileImage}
//       isPostPage={isPostPage}
//     />
//   );
// }

// export default PublicationLogo;

// components/publication-logo.tsx

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { generateBlogTitleWithoutDisplayTitle } from '../utils/commonUtils';
import { twJoin } from 'tailwind-merge';
import { Preferences, User, PublicationFragment } from '../generated/graphql';

type PublicationLogoProps = {
  publication: Pick<PublicationFragment, 'title' | 'isTeam'> & {
    author: Pick<User, 'username' | 'name' | 'profilePicture'>;
  } & {
    preferences: Pick<Preferences, 'darkMode'>;
  };
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  withProfileImage?: boolean;
  isPostPage?: boolean | null;
};

const textStyles = {
  xs: 'text-base text-left',
  sm: 'text-lg md:text-xl text-left',
  lg: 'text-xl md:text-2xl text-left',
  xl: 'text-2xl text-center',
} as const;

const logoSizes = {
  xs: 'w-44',
  sm: 'w-44',
  lg: 'w-64',
  xl: 'w-64',
} as const;

const CustomLogo = ({
  publication,
  size = 'lg',
  isPostPage,
}: {
  publication: Pick<PublicationFragment, 'title'> & {
    author: Pick<User, 'name'>;
  } & {
    preferences: Pick<Preferences, 'darkMode'>;
  };
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  isPostPage?: boolean | null;
}) => {
  const { theme } = useTheme();
  const blogTitle = generateBlogTitleWithoutDisplayTitle(publication);
  const fillColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <h1 className="blog-main-logo">
      <Link
        className={twJoin(
          'blog-logo focus-ring-base flex flex-row items-center',
          'focus-ring-colors-base',
          logoSizes[size]
        )}
        aria-label={`${blogTitle} home page`}
        href={`/${isPostPage ? '?source=top_nav_blog_home' : ''}`}
      >
        <svg
          width="905"
          height="251"
          viewBox="0 0 905 251"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.263672 250.5V0.5H88.2072C157.711 0.5 191.399 12.5568 191.399 61.8475C191.399 108.656 158.065 109.72 131.47 111.848V126.032C169.413 127.45 209.838 130.996 209.838 184.188C209.838 240.926 157.711 250.5 92.4625 250.5H0.263672ZM57.0013 95.5355H95.2994C118.349 95.5355 134.661 95.5355 134.661 72.8404C134.661 50.1454 118.349 50.1454 95.2994 50.1454H57.0013V95.5355ZM57.0013 200.855H99.5547C133.243 200.855 153.101 200.855 153.101 173.195C153.101 145.181 133.243 145.181 99.5547 145.181H57.0013V200.855ZM426.621 0.5V50.1454H345.061V250.5H288.323V50.1454H206.409V0.5H426.621ZM667.992 0.5V50.1454H586.431V250.5H529.694V50.1454H447.779V0.5H667.992ZM692.861 250.5V0.5H789.672C849.247 0.5 901.02 14.3298 901.02 70.3582C901.02 111.493 867.687 122.84 837.545 126.387V140.571H874.069C893.573 140.571 904.211 151.209 904.211 170.713V250.5H847.474V162.557H749.601V250.5H692.861ZM749.601 112.911H789.672C823.36 112.911 844.282 112.911 844.282 81.7057C844.282 50.1454 823.36 50.1454 789.672 50.1454H749.601V112.911Z"
            fill={fillColor}
          />
        </svg>
      </Link>
    </h1>
  );
};

const DefaultLogo = ({
  publication,
  size = 'lg',
  withProfileImage = false,
  isPostPage,
}: {
  publication: Pick<PublicationFragment, 'title' | 'isTeam'> & {
    author: Pick<User, 'username' | 'name' | 'profilePicture'>;
  } & {
    preferences: Pick<Preferences, 'darkMode'>;
  };
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  withProfileImage?: boolean;
  isPostPage?: boolean | null;
}) => {
  const blogTitle = generateBlogTitleWithoutDisplayTitle(publication);

  return (
    <h1
      className={twJoin(
        'blog-title',
        textStyles[size],
        'break-words font-heading font-semibold leading-snug md:font-bold',
        'dark:text-white'
      )}
    >
      <Link
        href={`/${isPostPage ? '?source=top_nav_blog_home' : ''}`}
        className={twJoin(
          'focus-ring-base flex flex-row items-center',
          'focus-ring-colors-base'
        )}
        aria-label={`${blogTitle} home page`}
      >
        {!publication.isTeam &&
          publication.author.profilePicture &&
          withProfileImage && (
            <div className="mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
              {/* <CustomImage> component removed */}
            </div>
          )}
        {blogTitle}
      </Link>
    </h1>
  );
};

function PublicationLogo(props: PublicationLogoProps) {
  const { publication, size, withProfileImage, isPostPage } = props;

  if (!publication) {
    return null;
  }

  return (
    <CustomLogo
      publication={publication}
      size={size}
      isPostPage={isPostPage}
    />
  );
}

export default PublicationLogo;
