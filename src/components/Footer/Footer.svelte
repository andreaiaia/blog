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
      <h2 class={css.title}>
        powered by AI <span class={css.desktopOnly}>-</span>
        <span class={css.mobileOnly}> <br /></span>
        <span class={css.accent}>A</span>ndrea
        <span class={css.accent}>I</span>ntelligence
      </h2>
    </div>
    <div class={css.row}>
      <div class={css.text}>
        <p>
          All the contents in this website are 100% made by me, Andrea Bianchi.
          AI is only used to provide a better English translation, since its not
          my native language.
        </p>
        <p>
          All the images are taken by me, unless otherwise stated, and are
          covered by copyright. The use of the images is allowed only for
          personal use. Any other use is forbidden.
        </p>
      </div>
    </div>
    <div class={`${css.row} ${css.linksRow}`}>
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
