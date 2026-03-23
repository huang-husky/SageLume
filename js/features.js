import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://uxqxbngvctkcrzcxiqff.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_LjlNWK0x6W80u6t_jdIXsw_bFIfsiCd'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 获取当前页面 slug（用路径作为唯一标识）
function getSlug() {
  return location.pathname.replace(/\/$/, '') || '/'
}

// ─── 访问量 ───────────────────────────────────────────

async function initViews() {
  const slug = getSlug()

  // 自增
  await supabase.rpc('increment_view', { page_slug: slug })

  // 读取并显示
  const { data } = await supabase
    .from('page_views')
    .select('count')
    .eq('slug', slug)
    .single()

  document.querySelectorAll('.view-count').forEach(el => {
    el.textContent = data?.count ?? 1
  })
}

// ─── 点赞 ─────────────────────────────────────────────

async function initLikes() {
  const slug = getSlug()
  const { data: { user } } = await supabase.auth.getUser()

  // 读取点赞数
  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('slug', slug)

  // 读取当前用户是否已点赞
  let liked = false
  if (user) {
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('slug', slug)
      .eq('user_id', user.id)
      .maybeSingle()
    liked = !!data
  }

  updateLikeUI(count ?? 0, liked)
}

function updateLikeUI(count, liked) {
  document.querySelectorAll('.like-count').forEach(el => el.textContent = count)
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.classList.toggle('liked', liked)
    btn.title = liked ? '取消点赞' : '点赞'
  })
}

async function toggleLike() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    alert('请先登录后再点赞')
    return
  }

  const slug = getSlug()
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('slug', slug)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id)
  } else {
    await supabase.from('likes').insert({ slug, user_id: user.id })
  }

  await initLikes()
}

// ─── 登录 / 登出 ──────────────────────────────────────

async function initAuth() {
  const { data: { user } } = await supabase.auth.getUser()
  updateAuthUI(user)

  supabase.auth.onAuthStateChange((_event, session) => {
    updateAuthUI(session?.user ?? null)
  })
}

function updateAuthUI(user) {
  document.querySelectorAll('.auth-btn').forEach(btn => {
    if (user) {
      btn.textContent = `登出 ${user.user_metadata?.user_name ?? ''}`
      btn.onclick = () => supabase.auth.signOut()
    } else {
      btn.textContent = '用 GitHub 登录'
      btn.onclick = () => supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: location.href }
      })
    }
  })

  document.querySelectorAll('.user-avatar').forEach(img => {
    img.src = user?.user_metadata?.avatar_url ?? ''
    img.style.display = user ? 'inline-block' : 'none'
  })
}

// ─── 初始化 ───────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initAuth()
  initViews()
  if (document.querySelector('.like-btn')) initLikes()
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', toggleLike)
  })
})
