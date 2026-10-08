import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CircleAlert, ExternalLink, ImagePlus, LayoutDashboard, Loader2, LogOut, Package, Plus, Save, ShieldCheck, ShoppingBag, Trash2, Upload, X } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { emptyProduct, fromExistingProduct, lines, slugify, validateProduct, type ProductRow } from '../lib/productData';
import { PRODUCTS as LEGACY_PRODUCTS } from '../constants';
import { useProducts } from '../components/ProductsProvider';

const field = 'w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100';
const button = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50';
const panel = 'rounded-2xl border border-stone-200 bg-white p-5 shadow-sm';

function SetupNotice() {
  return <div className="flex min-h-screen items-center justify-center bg-[#fdf8f6] px-5">
    <div className={panel + ' max-w-lg space-y-3'}>
      <ShieldCheck className="text-amber-800" size={30}/>
      <h1 className="font-serif text-3xl text-[#563830]">Admin setup required</h1>
      <p className="text-sm text-stone-600">Connect a Supabase project, apply the SQL migration, then invite the client and grant an admin role. See <code>docs/ADMIN_SETUP.md</code> in the repository. This page intentionally does not accept credentials until configured.</p>
      <Link to="/" className="text-sm underline">Return to the website</Link>
    </div>
  </div>;
}

function Login({ onLogin }: { onLogin: (email: string, password: string) => Promise<string | null> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return <div className="flex min-h-screen items-center justify-center bg-[#fdf8f6] px-5">
    <form className={panel + ' w-full max-w-md space-y-5'} onSubmit={async e => {
      e.preventDefault(); setPending(true); setError(await onLogin(email, password)); setPending(false);
    }}>
      <div><p className="text-xs uppercase tracking-[.2em] text-amber-700">CoeurDesire</p>
        <h1 className="font-serif text-3xl text-[#563830]">Welcome back</h1>
        <p className="mt-2 text-sm text-stone-500">Sign in with your invited staff account.</p></div>
      <label className="block text-sm font-medium text-stone-700">Email
        <input className={field + ' mt-1'} type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} />
      </label>
      <label className="block text-sm font-medium text-stone-700">Password
        <input className={field + ' mt-1'} type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} />
      </label>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button disabled={pending} className={button + ' w-full bg-[#563830] text-white'}>{pending ? 'Signing in…' : 'Sign in'}</button>
      <Link to="/" className="flex items-center gap-2 text-sm text-stone-500"><ArrowLeft size={14}/> Back to storefront</Link>
    </form>
  </div>;
}

type EditorProps = { value: ProductRow; onChange: (p: ProductRow) => void; onSave: () => Promise<void>;
 onDelete: () => Promise<void>; onBack: () => void; onUpload: (file: File) => Promise<void>;
 busy: boolean; error: string | null; success: string | null; };
function ProductEditor({ value, onChange, onSave, onDelete, onBack, onUpload, busy, error, success }: EditorProps) {
  const set = <K extends keyof ProductRow>(key: K, data: ProductRow[K]) => onChange({ ...value, [key]: data });
  const [uploading, setUploading] = useState(false);
  const setImageOrder = (index: number, direction: number) => {
    const dest = index + direction; if (dest < 0 || dest >= value.images.length) return;
    const updated = [...value.images]; [updated[index],updated[dest]] = [updated[dest],updated[index]];
    onChange({ ...value, images: updated, image_url: updated[0] || '' });
  };
  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <button className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800" onClick={onBack}><ArrowLeft size={16}/> All products</button>
      <div className="flex items-center gap-2">
        <span className={'rounded-full px-3 py-1 text-xs font-bold ' + (value.status === 'published' ? 'bg-green-100 text-green-800':'bg-amber-100 text-amber-800')}>{value.status}</span>
        <button disabled={busy} className={button + ' bg-[#563830] text-white'} onClick={() => void onSave()}><Save size={16}/> Save product</button>
      </div>
    </div>
    <h2 className="font-serif text-3xl text-[#563830]">{value.name || 'New product'}</h2>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {success && <p role="status" className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-800"><CheckCircle2 size={16}/>{success}</p>}
    <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
      <div className="space-y-5">
        <section className={panel + ' space-y-4'}>
          <h3 className="font-serif text-xl">Details</h3>
          <label className="block text-sm font-medium">Product name<input className={field+' mt-1'} maxLength={150} value={value.name}
            onChange={e => { const name = e.target.value; onChange({...value, name, slug: value.slug === slugify(value.name) ? slugify(name) : value.slug || slugify(name)}); }}/></label>
          <label className="block text-sm font-medium">URL slug<input className={field+' mt-1'} value={value.slug} onChange={e=>set('slug',slugify(e.target.value))}/></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">Price (USD)<input type="number" step=".01" min="0" className={field+' mt-1'} value={value.price_num} onChange={e=>set('price_num',Number(e.target.value))}/></label>
            <label className="block text-sm font-medium">Category<select className={field+' mt-1'} value={value.category} onChange={e=>set('category',e.target.value as ProductRow['category'])}>
              <option>Oil</option><option>Hair</option><option>Accessory</option></select></label>
          </div>
          <label className="block text-sm font-medium">Short description<textarea className={field+' mt-1'} rows={2} value={value.description} onChange={e=>set('description',e.target.value)}/></label>
          <label className="block text-sm font-medium">Long description<textarea className={field+' mt-1'} rows={5} value={value.long_description} onChange={e=>set('long_description',e.target.value)}/></label>
          <label className="block text-sm font-medium">Ingredient hint<input className={field+' mt-1'} value={value.hint} onChange={e=>set('hint',e.target.value)}/></label>
          <label className="block text-sm font-medium">Ingredients (one per line)<textarea className={field+' mt-1'} rows={4} value={value.ingredients.join('\n')} onChange={e=>set('ingredients',lines(e.target.value))}/></label>
          <label className="block text-sm font-medium">Benefits (one per line)<textarea className={field+' mt-1'} rows={4} value={value.benefits.join('\n')} onChange={e=>set('benefits',lines(e.target.value))}/></label>
          <label className="block text-sm font-medium">How to use<textarea className={field+' mt-1'} rows={3} value={value.how_to_use} onChange={e=>set('how_to_use',e.target.value)}/></label>
        </section>
        <section className={panel + ' space-y-4'}>
          <h3 className="font-serif text-xl">Product photos</h3>
          <p className="text-sm text-stone-500">JPG, PNG, WebP or AVIF, up to 5 MB. The first image is the main image. Uploads are saved to media storage immediately; save the product to publish their placement.</p>
          <label className={button + ' cursor-pointer border border-dashed border-amber-700 bg-amber-50 text-amber-900'}>
            <Upload size={16}/>{uploading?'Uploading…':'Upload photo'}
            <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy||uploading} onChange={async e => {
              const file=e.target.files?.[0]; if (!file) return;
              setUploading(true); try { await onUpload(file); } finally { setUploading(false); e.target.value=''; }
            }}/>
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {value.images.map((url,index)=><div key={url} className="overflow-hidden rounded-xl border bg-stone-50">
              <div className="aspect-square"><img src={url} alt={value.name+' photo '+(index+1)} className="h-full w-full object-cover"/></div>
              <div className="flex justify-between gap-1 p-1">
                <button className="rounded px-2 text-xs" disabled={index===0} title="Move earlier" onClick={()=>setImageOrder(index,-1)}>←</button>
                <button className="rounded px-2 text-xs text-red-800" title="Remove from product" onClick={()=>{const images=value.images.filter((_,i)=>i!==index);onChange({...value,images,image_url:images[0]||''});}}><X size={14}/></button>
                <button className="rounded px-2 text-xs" disabled={index===value.images.length-1} title="Move later" onClick={()=>setImageOrder(index,1)}>→</button>
              </div>
            </div>)}
          </div>
          {!value.images.length && <p className="flex items-center gap-2 rounded-xl bg-stone-50 p-4 text-sm text-stone-500"><ImagePlus size={18}/> No real product photos yet. Storefront uses its decorative placeholder.</p>}
        </section>
      </div>
      <div className="space-y-5">
        <section className={panel + ' space-y-4'}>
          <h3 className="font-serif text-xl">Visibility</h3>
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={value.status==='published'} onChange={e=>set('status',e.target.checked?'published':'draft')}/> Published on storefront</label>
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={value.in_stock} onChange={e=>set('in_stock',e.target.checked)}/> In stock</label>
          <label className="block text-sm font-medium">Badge<input className={field+' mt-1'} placeholder="New arrival" value={value.badge} onChange={e=>set('badge',e.target.value)}/></label>
          <label className="block text-sm font-medium">Display order<input type="number" className={field+' mt-1'} value={value.sort_order} onChange={e=>set('sort_order',Number(e.target.value))}/></label>
          <label className="block text-sm font-medium">Optional checkout URL<input type="url" className={field+' mt-1'} placeholder="https://..." value={value.purchase_url} onChange={e=>set('purchase_url',e.target.value)}/></label>
          <p className="text-xs text-stone-500">Leave checkout URL empty to keep the site's existing inquiry flow.</p>
          <label className="block text-sm font-medium">Card background CSS gradient<input className={field+' mt-1'} value={value.card_bg} onChange={e=>set('card_bg',e.target.value)}/></label>
          <a href={value.status==='published'?'/catalog/'+value.slug:undefined} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-amber-800 underline">{value.status==='published'?'View published page':'Publish to enable public preview'}<ExternalLink size={13}/></a>
        </section>
        <section className={panel}>
          <h3 className="mb-2 font-serif text-xl">Danger zone</h3>
          <p className="mb-3 text-sm text-stone-500">Deletion removes the product listing. Uploaded assets are retained until cleaned up separately.</p>
          <button disabled={busy} onClick={()=>void onDelete()} className={button+' border border-red-200 text-red-700'}><Trash2 size={15}/> Delete product</button>
        </section>
      </div>
    </div>
  </div>;
}
type Tab = 'dashboard' | 'products';
function AdminWorkspace({ session, role }: { session: Session; role: string }) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [rows,setRows] = useState<ProductRow[]>([]);
  const [selected,setSelected] = useState<ProductRow | null>(null);
  const [loading,setLoading] = useState(true);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState<string | null>(null);
  const [success,setSuccess] = useState<string | null>(null);
  const [changingPassword,setChangingPassword] = useState(false);
  const [password,setPassword] = useState('');
  const { reload } = useProducts();

  const refresh = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data,error } = await supabase.from('products').select('*').order('sort_order',{ascending:true}).order('name',{ascending:true});
    if (error) setError(error.message); else { setRows((data||[]) as ProductRow[]); setError(null); }
    setLoading(false);
  },[]);
  useEffect(()=>{void refresh();},[refresh]);
  const save = async () => {
    if (!supabase||!selected) return;
    const issue=validateProduct(selected);if(issue){setError(issue);return;}
    setBusy(true);setError(null);setSuccess(null);
    const {created_at,updated_at,...fields}=selected;
    const {error}=await supabase.from('products').upsert(fields,{onConflict:'id'});
    if(error)setError(error.message); else {
      setSuccess('Saved successfully. Published changes are live.');
      await refresh();await reload();
    }
    setBusy(false);
  };
  const remove = async () => {
    if (!supabase||!selected||!window.confirm('Permanently delete '+selected.name+'? This cannot be undone.'))return;
    setBusy(true);
    const {error}=await supabase.from('products').delete().eq('id',selected.id);
    if(error)setError(error.message);else{setSelected(null);await refresh();await reload();}
    setBusy(false);
  };
  const upload = async (file:File) => {
    if(!supabase||!selected)return;
    if(file.size>5*1024*1024||!['image/jpeg','image/png','image/webp','image/avif'].includes(file.type)) {setError('Use a JPG, PNG, WebP, or AVIF smaller than 5 MB.');return;}
    setError(null);
    const ext:{[key:string]:string}={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'};
    const path=session.user.id+'/'+crypto.randomUUID()+'.'+ext[file.type];
    const {error}=await supabase.storage.from('product-media').upload(path,file,{contentType:file.type,upsert:false});
    if(error){setError(error.message);return;}
    const {data}=supabase.storage.from('product-media').getPublicUrl(path);
    const images=[...selected.images,data.publicUrl];
    setSelected({...selected,images,image_url:images[0]||''});
    setSuccess('Photo uploaded. Save product to apply it.');
  };
  const importExisting = async () => {
    if(!supabase||rows.length||!window.confirm('Import the three products from the existing website?'))return;
    setBusy(true);setError(null);
    const {error}=await supabase.from('products').insert(LEGACY_PRODUCTS.map((p,i)=>{const {created_at,updated_at,...item}=fromExistingProduct(p,i);return item;}));
    if(error)setError(error.message);else{await refresh();await reload();setSuccess('Three starter products imported.');}
    setBusy(false);
  };
  return <div className="min-h-screen bg-[#fdf8f6] text-[#563830]">
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5">
        <div><p className="text-[10px] uppercase tracking-[.25em] text-amber-700">CoeurDesire</p><h1 className="font-serif text-2xl">Studio Admin</h1></div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
          <span className="hidden sm:inline">{session.user.email} · {role}</span>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">View site <ExternalLink size={14}/></a>
          <button className="flex items-center gap-1 hover:underline" onClick={()=>void supabase?.auth.signOut()}><LogOut size={14}/> Sign out</button>
        </div>
      </div>
    </header>
    <div className="mx-auto grid max-w-7xl gap-7 px-4 py-7 md:grid-cols-[190px_1fr]">
      <nav className="flex gap-2 md:flex-col">
        {([{id:'dashboard',name:'Overview',icon:LayoutDashboard},{id:'products',name:'Products',icon:ShoppingBag}] as const).map(item=><button key={item.id} onClick={()=>{setTab(item.id);setSelected(null);setSuccess(null);setError(null);}}
          className={'flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium '+(tab===item.id?'bg-[#563830] text-white':'bg-white text-stone-600 hover:bg-stone-100')}><item.icon size={17}/>{item.name}</button>)}
      </nav>
      <main className="min-w-0 space-y-6">
        {tab==='dashboard'&&<>
          <div><p className="text-sm text-stone-500">Storefront administration</p><h2 className="font-serif text-3xl">Overview</h2></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className={panel}><p className="text-sm text-stone-500">Products</p><p className="mt-2 text-3xl font-bold">{rows.length}</p></div>
            <div className={panel}><p className="text-sm text-stone-500">Published</p><p className="mt-2 text-3xl font-bold">{rows.filter(p=>p.status==='published').length}</p></div>
            <div className={panel}><p className="text-sm text-stone-500">Drafts</p><p className="mt-2 text-3xl font-bold">{rows.filter(p=>p.status==='draft').length}</p></div>
          </div>
          <div className={panel+' space-y-3'}>
            <h3 className="font-serif text-xl">Quick actions</h3>
            <p className="text-sm text-stone-500">Manage product listings, images, availability, and inquiry or checkout links. Analytics and mission editing arrive in later milestones.</p>
            <button onClick={()=>setTab('products')} className={button+' bg-[#563830] text-white'}><Package size={16}/> Manage products</button>
          </div>
          <div className={panel+' space-y-3'}>
            <h3 className="font-serif text-xl">Account security</h3>
            <button className="text-sm text-amber-800 underline" onClick={()=>setChangingPassword(v=>!v)}>Change password</button>
            {changingPassword&&<form className="flex max-w-md flex-wrap gap-2" onSubmit={async e=>{e.preventDefault();if(password.length<12){setError('Password must contain at least 12 characters.');return;}const {error}=await supabase!.auth.updateUser({password});setError(error?.message||null);if(!error){setSuccess('Password updated.');setPassword('');setChangingPassword(false);}}}>
              <input type="password" minLength={12} placeholder="New password (12+ characters)" className={field} value={password} onChange={e=>setPassword(e.target.value)}/><button className={button+' bg-[#563830] text-white'}>Update</button></form>}
          </div>
        </>}
        {tab==='products'&& (selected?<ProductEditor value={selected} onChange={setSelected} onSave={save} onDelete={remove} onBack={()=>{setSelected(null);setError(null);setSuccess(null);}} onUpload={upload} busy={busy} error={error} success={success}/>:
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-stone-500">The Collection</p><h2 className="font-serif text-3xl">Products</h2></div>
              <button className={button+' bg-[#563830] text-white'} onClick={()=>{setSelected(emptyProduct());setSuccess(null);setError(null);}}><Plus size={16}/> Add product</button>
            </div>
            {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            {success&&<p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">{success}</p>}
            {loading?<p>Loading products…</p>:rows.length===0?<div className={panel+' space-y-3'}><p className="text-sm text-stone-600">No products in your database. Import the existing catalog to keep the storefront unchanged.</p>
              <button disabled={busy} onClick={()=>void importExisting()} className={button+' bg-[#563830] text-white'}><Upload size={16}/> Import 3 existing products</button></div>:
              <div className="space-y-3">{rows.map(p=><button key={p.id} onClick={()=>{setSelected({...p,images:[...(p.images||[])]});setError(null);setSuccess(null);}}
                className={panel+' flex w-full items-center gap-4 text-left transition hover:border-amber-400'}>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-amber-50">{p.image_url?<img src={p.image_url} alt="" className="h-full w-full object-cover"/>:<ShoppingBag size={23}/>}</div>
                <div className="min-w-0 flex-1"><h3 className="truncate font-medium">{p.name}</h3><p className="text-sm text-stone-500">{p.category} · ${Number(p.price_num).toFixed(2)}</p></div>
                <span className={'rounded-full px-2 py-1 text-xs '+(p.status==='published'?'bg-green-100 text-green-800':'bg-amber-100 text-amber-800')}>{p.status}</span>
              </button>)}</div>}
          </div>)}
        {(error||success)&&tab==='dashboard'&&<div role="status" className={'rounded-xl p-3 text-sm '+(error?'bg-red-50 text-red-800':'bg-green-50 text-green-800')}>{error||success}</div>}
      </main>
    </div>
  </div>;
}

export default function AdminApp() {
  const [session,setSession]=useState<Session|null>(null);
  const [checked,setChecked]=useState(false);
  const [role,setRole]=useState<string|null>(null);
  const [authorized,setAuthorized]=useState(false);
  useEffect(()=>{
    if(!supabase) return;
    let active=true;
    void supabase.auth.getSession().then(({data})=>{if(active){setSession(data.session);setChecked(true);}});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{if(active){setSession(next);setAuthorized(false);}});
    return()=>{active=false;subscription.unsubscribe();};
  },[]);
  useEffect(()=>{
    if(!supabase||!checked)return;
    if(!session){setRole(null);setAuthorized(true);return;}
    let active=true;setAuthorized(false);
    void supabase.from('admin_users').select('role').eq('user_id',session.user.id).maybeSingle().then(({data})=>{
      if(active){setRole(data?.role || null);setAuthorized(true);}
    });
    return()=>{active=false;};
  },[session?.user.id,checked]);
  if(!supabase)return <SetupNotice/>;
  if(!checked||!authorized)return <div className="flex min-h-screen items-center justify-center bg-[#fdf8f6]"><Loader2 className="animate-spin" size={26}/></div>;
  if(!session)return <Login onLogin={async(email,password)=>{const {error}=await supabase.auth.signInWithPassword({email,password});return error?.message||null;}}/>;
  if(!role)return <div className="flex min-h-screen items-center justify-center bg-[#fdf8f6] p-5"><div className={panel+' max-w-md space-y-3'}><CircleAlert className="text-amber-700"/><h1 className="font-serif text-2xl">Access not granted</h1><p className="text-sm text-stone-500">This account is signed in but has not been authorized to manage CoeurDesire. Ask the developer to grant access.</p><button className={button+' border'} onClick={()=>void supabase.auth.signOut()}>Sign out</button></div></div>;
  return <AdminWorkspace session={session} role={role}/>;
}
