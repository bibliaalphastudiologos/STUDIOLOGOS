<?php
    require_once __DIR__ . '/config.php';
    if (current_user()) { header('Location: /'); exit; }
    $error = flash('error');
    ?><!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Criar conta – <?=APP_NAME?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet">
    <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#f8f7f4;--card:#fff;--text:#1a1a18;--muted:#6b6a66;--light:#a8a7a2;--accent:#3b6de8;--border:#e8e6df;--shadow:0 4px 24px rgba(0,0,0,.09)}
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);font-family:'Inter',sans-serif;padding:24px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:48px 40px;max-width:400px;width:100%;box-shadow:var(--shadow);text-align:center}
    .logo{font-family:'Lora',serif;font-size:28px;font-weight:500;color:var(--text);margin-bottom:6px}
    .logo span{color:var(--accent)}
    .sub{font-size:13px;color:var(--light);margin-bottom:36px;line-height:1.5}
    label{display:block;text-align:left;font-size:11px;font-weight:600;letter-spacing:.08em;color:var(--muted);margin-bottom:5px}
    input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:14px;color:var(--text);background:#fff;outline:none;transition:.15s;margin-bottom:16px}
    input:focus{border-color:var(--accent)}
    .btn{width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:.15s;margin-top:4px}
    .btn:hover{background:#2a53c5}
    .link{font-size:13px;color:var(--muted);margin-top:20px}
    .link a{color:var(--accent);text-decoration:none;font-weight:500}
    .msg{border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:20px;text-align:left;line-height:1.5}
    .msg.error{background:#fde8e8;border:1px solid #f5b8b8;color:#8b0000}
    .hint{font-size:11px;color:var(--light);text-align:left;margin-top:-12px;margin-bottom:16px}
    </style></head>
    <body>
    <div class="card">
      <div class="logo">Bíblia <span>Alpha</span></div>
      <p class="sub">Crie sua conta para solicitar acesso.</p>
      <?php if($error):?><div class="msg error"><?=htmlspecialchars($error)?></div><?php endif?>
      <form method="POST" action="/auth.php">
        <input type="hidden" name="action" value="register">
        <div><label>SEU NOME</label><input type="text" name="name" placeholder="Nome completo" required minlength="2"></div>
        <div><label>E-MAIL</label><input type="email" name="email" placeholder="seu@email.com" required></div>
        <div><label>SENHA</label><input type="password" name="password" placeholder="Mínimo 8 caracteres" required minlength="8"></div>
        <div><label>CONFIRMAR SENHA</label><input type="password" name="password2" placeholder="Repita a senha" required></div>
        <button class="btn" type="submit">CRIAR CONTA</button>
      </form>
      <p class="link">Já tem conta? <a href="/index.php">Entrar</a></p>
    </div>
    </body></html>
