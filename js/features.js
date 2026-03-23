import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient(
  'https://uxqxbngvctkcrzcxiqff.supabase.co',
  'sb_publishable_LjlNWK0x6W80u6t_jdIXsw_bFIfsiCd'
)

async function initViews() {
  const slug = location.pathname.replace(/\/$/, '') || '/'

  await supabase.rpc('increment_view', { page_slug: slug })

  const { data } = await supabase
    .from('page_views')
    .select('count, reset_at')
    .eq('slug', slug)
    .single()

  document.querySelectorAll('.view-count').forEach(el => {
    const count = data?.count ?? 1
    const since = data?.reset_at
      ? new Date(data.reset_at).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
      : '3月24日'
    el.textContent = `${count} · 自${since}`
  })
}

document.addEventListener('DOMContentLoaded', initViews)
