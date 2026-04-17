<?php
    require_once __DIR__ . '/config.php';
    $user = current_user();
    if (!$user) { header('Location: /index.php'); exit; }
    if ($user['status'] === 'approved') { header('Location: /app/'); exit; }
    ?><!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Aguardando aprovação – <?=APP_NAME?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet">
    <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#f8f7f4;--card:#fff;--text:#1a1a18;--muted:#6b6a66;--light:#a8a7a2;--accent:#3b6de8;--border:#e8e6df;--shadow:0 4px 24px rgba(0,0,0,.09)}
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);font-family:'Inter',sans-serif;padding:24px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:48px 40px;max-width:400px;width:100%;box-shadow:var(--shadow);text-align:center}
    .logo{font-family:'Lora',serif;font-size:28px;font-weight:500;color:var(--text);margin-bottom:6px}
    .logo span{color:var(--accent)}
    .icon{font-size:48px;margin:24px 0 12px}
    h2{font-size:18px;font-weight:600;margin-bottom:10px}
    p{font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:8px}
    .badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.06em;margin-bottom:24px}
    .badge.pending{background:#fff3e0;color:#e65100;border:1px solid #ffcc80}
    .badge.rejected{background:#fde8e8;color:#8b0000;border:1px solid #f5b8b8}
    .btn-out{display:inline-block;margin-top:20px;padding:10px 24px;background:transparent;border:1.5px solid var(--border);border-radius:8px;font-size:13px;color:var(--muted);text-decoration:none}
    </style></head>
    <body>
    <div class="card">
      <div class="logo">Bíblia <span>Alpha</span></div>
      <?php if($user['status']==='rejected'):?>
        <div class="icon">⛔</div><h2>Acesso negado</h2>
        <span class="badge rejected">REJEITADO</span>
        <p>Sua solicitação foi recusada pelo administrador.</p>
      <?php else:?>
        <div class="icon">⏳</div><h2>Aguardando aprovação</h2>
        <span class="badge pending">PENDENTE</span>
        <p>Conta criada com sucesso!<br>O administrador irá liberar seu acesso em breve.</p>
      <?php endif?>
      <p style="font-size:12px;color:var(--light);margin-top:12px">Logado como <strong><?=htmlspecialchars($user['email'])?></strong></p>
      <a href="/auth.php?action=logout" class="btn-out">Sair</a>
    </div>
    </body></html>
