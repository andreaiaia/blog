<script>
  import NotByAi from './NotByAi.svelte'
  import css from './Footer.module.scss'
  import {
    RssIcon,
    InstagramIcon,
    GithubIcon,
    LinkedinIcon
  } from 'svelte-feather-icons'

  const YEAR = new Date().getFullYear()
</script>

<footer class={css.footer}>
  <div class={css.content}>
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
      <time>{YEAR}</time> © Andrea Bianchi.
    </small>
    <!-- <div class={css.themeSwitcher}>
          <ThemeSwitcher />
        </div> -->
    <!-- <div class={css.otherLinks}>
      <p class={css.smallTitle}>Links</p>
      <ul>
        <li class={css.footerLink}>
          <a href="/blog/bookmarks">Bookmarks</a>
        </li>
      </ul>
    </div>
    <div class={css.notAiBadge}>
      <a href="https://notbyai.fyi/">
        <NotByAi />
      </a>
    </div> -->
  </div>
</footer>
