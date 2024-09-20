<script>
  import css from './Footer.module.scss'
  import {
    RssIcon,
    InstagramIcon,
    GithubIcon,
    LinkedinIcon
  } from 'svelte-feather-icons'

  export let addStyle = ''

  const YEAR = new Date().getFullYear()
</script>

<footer class={`${css.footer} ${addStyle}`}>
  <div class={css.content}>
    <div class={css.row}>
      <p class={css.title}>powered by A.I. - Andrea Intelligence</p>
    </div>
    <div class={css.row}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </div>
    <div class={css.row}>
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
        <time>{YEAR}</time> © Andrea Bianchi
      </small>
    </div>
  </div>
</footer>
