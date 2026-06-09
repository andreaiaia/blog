<script lang="ts">
  import css from './Footer.module.scss';
  import {
    RssIcon,
    InstagramIcon,
    GithubIcon,
    LinkedinIcon,
    YoutubeIcon,
  } from 'svelte-feather-icons';
  import { useTranslations } from '@/i18n/utils';
  import { translations } from '@/i18n/ui';

  export let lang = 'it';
  export let alternateLangUrl = '/';

  const t = useTranslations(lang as 'it' | 'en');
  const tx = translations[lang as 'it' | 'en'];

  const prefix = lang === 'it' ? '' : `/${lang}`;
  const navLinks = [
    { href: prefix || '/', label: t('nav.home') },
    { href: `${prefix}/blog`, label: t('nav.blog') },
    { href: `${prefix}/photo`, label: t('nav.photo') },
    { href: `${prefix}/about`, label: t('nav.about') },
  ];

  const socialLinks = [
    { href: '/feed.xml', label: 'RSS', Icon: RssIcon, external: false },
    { href: 'https://instagram.com/andreaiaia', label: 'Instagram', Icon: InstagramIcon, external: true },
    { href: 'https://www.youtube.com/@andrea.bianchi', label: 'YouTube', Icon: YoutubeIcon, external: true },
    { href: 'https://github.com/andreaiaia', label: 'GitHub', Icon: GithubIcon, external: true },
    { href: 'https://linkedin.com/in/andreaiaia/', label: 'LinkedIn', Icon: LinkedinIcon, external: true },
  ];
</script>

<footer class={css.footer}>
  <div class={css.content}>
    <div class={css.grid}>
      <div>
        <h2 class={css.name}>
          <span class={css.nameAccent}>Andrea</span> Bianchi
        </h2>
        <p class={css.textBlock}>{tx.madeByMain}</p>
        <p class={css.textBlock}>{tx.madeByAi}</p>
        <p class={css.textBlock}>{tx.copyright}</p>
      </div>
      <div>
        <p class={css.colLabel}>{t('footer.pages')}</p>
        <ul class={css.navLinks}>
          {#each navLinks as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
      <div>
        <p class={css.colLabel}>{t('footer.follow')}</p>
        <ul class={css.socialLinks}>
          {#each socialLinks as { href, label, Icon, external }}
            <li>
              <a
                class={css.socialItem}
                {href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <Icon class={css.icon} size="14" />
                {label}
              </a>
            </li>
          {/each}
        </ul>
        <a
          href={alternateLangUrl}
          class={css.langLink}
          aria-label={lang === 'it' ? 'Switch to English' : "Passa all'italiano"}
        >
          {lang === 'it' ? 'English' : 'Italiano'}<span class={css.langArrow}> →</span>
        </a>
      </div>
    </div>
    <div class={css.bottomBar}>
      <span class={css.copy}><time>{new Date().getFullYear()}</time> © Andrea Bianchi</span>
      <span class={css.copy}>{t('footer.rights')}</span>
    </div>
  </div>
</footer>
