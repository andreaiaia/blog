<script>
  import css from './Footer.module.scss';
  import {
    RssIcon,
    InstagramIcon,
    GithubIcon,
    LinkedinIcon,
    YoutubeIcon,
  } from 'svelte-feather-icons';

  export let addStyle = '';
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
          All the contents in this website are 100% made by me, Andrea Bianchi.
          AI is only used to provide a better English translation, since it's
          not my native language.
        </p>
        <p>
          All the images are taken by me, unless otherwise stated, and are
          covered by copyright. Any use of the images is forbidden.
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
