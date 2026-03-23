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
    el.textContent = data?.count ?? 1
  })
}

document.addEventListener('DOMContentLoaded', initViews)
