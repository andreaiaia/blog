<script>
  import css from './Footer.module.scss';
  import {
    RssIcon,
    InstagramIcon,
    GithubIcon,
    LinkedinIcon,
    YoutubeIcon,
  } from 'svelte-feather-icons';
  import { translations } from '../../i18n/ui';

  export let addStyle = '';
  export let lang = 'it';
</script>

<footer class={`${css.footer} ${addStyle}`}>
  <div class={css.content}>
    <div class={css.row}>
      <h2 class={css.title}>
        <span class={css.accent}>A</span>ndrea
        <span class={css.accent}>B</span>ianchi
      </h2>
    </div>
    <div class={css.row}>
      <div class={css.text}>
        <p>
          {translations[lang].madeBy}
        </p>
        <p>
          {translations[lang].copyright}
        </p>
      </div>
    </div>
    <div class={css.linksRow}>
      <ul class={css.socialLinks}>
        <li>
          <a href="/feed.xml">
            <RssIcon class={css.icon} />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/andreaiaia" target="_blank">
            <InstagramIcon class={css.icon} />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@andrea.bianchi" target="_blank">
            <YoutubeIcon class={css.icon} />
          </a>
        </li>
        <li>
          <a href="https://github.com/andreaiaia" target="_blank">
            <GithubIcon class={css.icon} />
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/andreaiaia/" target="_blank">
            <LinkedinIcon class={css.icon} />
          </a>
        </li>
      </ul>
      <small class={css.credits}>
        <time>{new Date().getFullYear()}</time> © Andrea Bianchi
      </small>
    </div>
  </div>
</footer>
