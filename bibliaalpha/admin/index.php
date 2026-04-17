<?php
    require_once __DIR__ . '/../config.php';
    require_admin();

    $users  = load_users();
    $action = $_POST['action'] ?? '';
    $uid    = $_POST['uid'] ?? '';

    if (in_array($action,['approve','reject']) && $uid) {
        foreach ($users as &$u)
            if ($u['id']===$uid) { $u['status']=$action==='approve'?'approved':'rejected'; }
        unset($u);
        save_users($users);
        header('Location: /admin/'); exit;
    }
    if ($action==='delete' && $uid) {
        $users = array_values(array_filter($users, fn($u)=>$u['id']!==$uid));
        save_users($users);
        header('Location: /admin/'); exit;
    }

    usort($users, fn($a,$b)=>(['pending'=>0,'approved'=>1,'rejected'=>2][$a['status']]??9)<=>(['pending'=>0,'approved'=>1,'rejected'=>2][$b['status']]??9));
    $total    = count($users);
    $pending  = count(array_filter($users, fn($u)=>$u['status']==='pending'));
    $approved = count(array_filter($users, fn($u)=>$u['status']==='approved'));
    $rejected = count(array_filter($users, fn($u)=>$u['status']==='rejected'));
    $me = current_user();
    ?><!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Admin – <?=APP_NAME?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet">
    <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#f0efec;--card:#fff;--text:#1a1a18;--muted:#6b6a66;--light:#a8a7a2;--accent:#3b6de8;--border:#e8e6df;--shadow:0 2px 12px rgba(0,0,0,.07)}
    body{min-height:100vh;background:var(--bg);font-family:'Inter',sans-serif;color:var(--text)}
    header{background:var(--card);border-bottom:1px solid var(--border);padding:16px 32px;display:flex;align-items:center;justify-content:space-between}
    .logo{font-family:'Lora',serif;font-size:20px;font-weight:500}.logo span{color:var(--accent)}
    .hright{font-size:13px;color:var(--muted)}.hright a{color:var(--accent);text-decoration:none;font-weight:500;margin-left:16px}
    main{max-width:960px;margin:32px auto;padding:0 24px}
    h1{font-size:22px;font-weight:600;margin-bottom:6px}
    .sub{font-size:13px;color:var(--muted);margin-bottom:28px}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px}
    .stat{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center;box-shadow:var(--shadow)}
    .sn{font-size:32px;font-weight:700;color:var(--accent)}.sl{font-size:11px;font-weight:600;letter-spacing:.07em;color:var(--muted);margin-top:4px}
    .wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow);overflow:hidden}
    table{width:100%;border-collapse:collapse}
    th{padding:12px 16px;text-align:left;font-size:11px;font-weight:600;letter-spacing:.07em;color:var(--muted);background:#fafaf8;border-bottom:1px solid var(--border)}
    td{padding:14px 16px;font-size:13px;border-bottom:1px solid var(--border);vertical-align:middle}
    tr:last-child td{border-bottom:none}tr:hover td{background:#fafaf8}
    .nm{font-weight:500}.em{color:var(--muted);font-size:12px}.dt{font-size:11px;color:var(--light)}
    .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.05em}
    .badge.pending{background:#fff3e0;color:#e65100;border:1px solid #ffcc80}
    .badge.approved{background:#e8f5e9;color:#1b5e20;border:1px solid #a5d6a7}
    .badge.rejected{background:#fde8e8;color:#8b0000;border:1px solid #f5b8b8}
    .acts{display:flex;gap:8px;flex-wrap:wrap}
    .btn{padding:6px 14px;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:.15s}
    .a{background:#e8f5e9;color:#1b5e20;border:1px solid #a5d6a7}.a:hover{background:#c8e6c9}
    .r{background:#fde8e8;color:#8b0000;border:1px solid #f5b8b8}.r:hover{background:#ffcdd2}
    .d{background:#f5f5f5;color:var(--muted);border:1px solid var(--border)}.d:hover{background:#ffe0e0;color:#8b0000}
    .empty{text-align:center;padding:48px;color:var(--light);font-size:14px}
    @media(max-width:600px){.stats{grid-template-columns:repeat(2,1fr)}}
    </style></head>
    <body>
    <header>
      <div class="logo">Bíblia <span>Alpha</span> <span style="font-family:Inter;font-size:13px;font-weight:400;color:var(--muted);margin-left:6px">Painel Admin</span></div>
      <div class="hright"><?=htmlspecialchars($me['name'])?><a href="/auth.php?action=logout">Sair</a></div>
    </header>
    <main>
      <h1>Gestão de Usuários</h1>
      <p class="sub">Aprove ou rejeite os cadastros. Usuários aprovados acessam a Bíblia Alpha.</p>
      <div class="stats">
        <div class="stat"><div class="sn"><?=$total?></div><div class="sl">TOTAL</div></div>
        <div class="stat"><div class="sn" style="color:#e65100"><?=$pending?></div><div class="sl">PENDENTES</div></div>
        <div class="stat"><div class="sn" style="color:#1b5e20"><?=$approved?></div><div class="sl">APROVADOS</div></div>
        <div class="stat"><div class="sn" style="color:#8b0000"><?=$rejected?></div><div class="sl">REJEITADOS</div></div>
      </div>
      <div class="wrap">
        <?php if(empty($users)):?>
          <div class="empty">📭 Nenhum usuário cadastrado ainda.</div>
        <?php else:?>
        <table>
          <thead><tr><th>NOME / E-MAIL</th><th>STATUS</th><th>CADASTRO</th><th>AÇÕES</th></tr></thead>
          <tbody>
          <?php foreach($users as $u): if(strtolower($u['email'])===strtolower(ADMIN_EMAIL)) continue;?>
          <tr>
            <td><div class="nm"><?=htmlspecialchars($u['name'])?></div><div class="em"><?=htmlspecialchars($u['email'])?></div></td>
            <td><span class="badge <?=$u['status']?>"><?=match($u['status']){'pending'=>'⏳ Pendente','approved'=>'✅ Aprovado','rejected'=>'⛔ Rejeitado',default=>$u['status']}?></span></td>
            <td><span class="dt"><?=substr($u['created_at'],0,16)?></span></td>
            <td><div class="acts">
              <?php if($u['status']!=='approved'):?><form method="POST"><input type="hidden" name="action" value="approve"><input type="hidden" name="uid" value="<?=$u['id']?>"><button class="btn a" type="submit">✅ Aprovar</button></form><?php endif?>
              <?php if($u['status']!=='rejected'):?><form method="POST"><input type="hidden" name="action" value="reject"><input type="hidden" name="uid" value="<?=$u['id']?>"><button class="btn r" type="submit">❌ Rejeitar</button></form><?php endif?>
              <form method="POST" onsubmit="return confirm('Excluir este usuário?')"><input type="hidden" name="action" value="delete"><input type="hidden" name="uid" value="<?=$u['id']?>"><button class="btn d" type="submit">🗑</button></form>
            </div></td>
          </tr>
          <?php endforeach?>
          </tbody>
        </table>
        <?php endif?>
      </div>
    </main>
    </body></html>
