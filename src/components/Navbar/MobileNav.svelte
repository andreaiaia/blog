<script>
  import MenuIcon from '../MenuIcon/MenuIcon.svelte'
  import NavItems from './NavItems.svelte'

  import css from './MobileNav.module.scss'

  let open = false

  const handleMenu = () => {
    open = !open
  }
</script>

<div class={css.wrapper}>
  <MenuIcon isOpen={open} handler={handleMenu} />
  <nav class={open ? css.nav : `${css.nav} ${css.collapsed}`}>
    <NavItems menuHandler={handleMenu} />
  </nav>
</div>
