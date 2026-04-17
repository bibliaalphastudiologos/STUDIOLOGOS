
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import Shelf from '@/components/Shelf.jsx';

const HomePage = () => {

  const maisAcessados = [
    {
      id: 1,
      title: 'Bíblia Alpha',
      author: 'Edição Premium',
      category: 'Exclusivo',
      image: 'https://horizons-cdn.hostinger.com/5ded40e0-e222-47e2-bc6a-c4b82260a357/41899e6c7b23aab16478c60c1047a1bd.png',
      url: 'https://bibliaalpha.studiologos.com.br/'
    }
  ];

  const ebooksCristaos = [
    {
      id: 6,
      title: 'O Peregrino',
      author: 'John Bunyan',
      category: 'Clássico',
      image: 'https://images.unsplash.com/photo-1593485589800-579b43749b15?w=400&q=75'
    },
    {
      id: 7,
      title: 'Imitação de Cristo',
      author: 'Thomas à Kempis',
      category: 'Clássico',
      image: 'https://images.unsplash.com/photo-1673445354450-648495a35500?w=400&q=75'
    },
    {
      id: 8,
      title: 'Humildade',
      author: 'Andrew Murray',
      category: 'Devocional',
      image: 'https://images.unsplash.com/photo-1701385067127-d87d5b3243ca?w=400&q=75'
    },
    {
      id: 9,
      title: 'Com Cristo na Escola da Oração',
      author: 'Andrew Murray',
      category: 'Devocional',
      image: 'https://images.unsplash.com/photo-1539090336856-3d4a5e0c19d8?w=400&q=75'
    },
    {
      id: 10,
      title: 'Confissões',
      author: 'Agostinho',
      category: 'Autobiografia',
      image: 'https://images.unsplash.com/photo-1539090336856-3d4a5e0c19d8?w=400&q=75'
    }
  ];

  const teologia = [
    {
      id: 11,
      title: 'Teologia Sistemática',
      author: 'Louis Berkhof',
      category: 'Estudo',
      image: 'https://images.unsplash.com/photo-1493794076453-02c6800c70a2?w=400&q=75'
    },
    {
      id: 12,
      title: 'Teologia Sistemática',
      author: 'Charles Hodge',
      category: 'Estudo',
      image: 'https://images.unsplash.com/photo-1493794076453-02c6800c70a2?w=400&q=75'
    },
    {
      id: 13,
      title: 'Teologia Sistemática',
      author: 'Augustus Strong',
      category: 'Estudo',
      image: 'https://images.unsplash.com/photo-1493794076453-02c6800c70a2?w=400&q=75'
    },
    {
      id: 14,
      title: 'Doutrinas Fundamentais',
      author: 'R. A. Torrey',
      category: 'Doutrina',
      image: 'https://images.unsplash.com/photo-1564540400309-0745c2a66a11?w=400&q=75'
    },
    {
      id: 15,
      title: 'Atributos de Deus',
      author: 'A. W. Pink',
      category: 'Teologia',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&q=75'
    }
  ];

  const devocionais = [
    {
      id: 16,
      title: 'Sermões',
      author: 'Charles Spurgeon',
      category: 'Pregação',
      image: 'https://images.unsplash.com/photo-1544206732-1220e2a97562?w=400&q=75'
    },
    {
      id: 17,
      title: 'Sermões',
      author: 'Jonathan Edwards',
      category: 'Pregação',
      image: 'https://images.unsplash.com/photo-1544206732-1220e2a97562?w=400&q=75'
    },
    {
      id: 18,
      title: 'Sermões',
      author: 'John Wesley',
      category: 'Pregação',
      image: 'https://images.unsplash.com/photo-1544206732-1220e2a97562?w=400&q=75'
    },
    {
      id: 19,
      title: 'A Cidade de Deus',
      author: 'Agostinho',
      category: 'Filosofia',
      image: 'https://images.unsplash.com/photo-1562859176-8cc1200999b1?w=400&q=75'
    },
    {
      id: 20,
      title: 'Sobre a Encarnação',
      author: 'Atanásio',
      category: 'Apologética',
      image: 'https://images.unsplash.com/photo-1639775497346-b89e7dbc6fbf?w=400&q=75'
    },
    {
      id: 26,
      title: 'Salmos - Tesouro de Davi',
      author: 'Charles Spurgeon',
      category: 'Sermões e Devocionais',
      image: 'https://images.unsplash.com/photo-1601049336407-a8c5181737ce?w=400&q=75'
    }
  ];

  const novidades = [
    {
      id: 21,
      title: 'Contra as Heresias',
      author: 'Irineu',
      category: 'História',
      image: 'https://images.unsplash.com/photo-1467688695332-6b486449d78f?w=400&q=75'
    },
    {
      id: 22,
      title: 'Estudos Bíblicos',
      author: 'G. Campbell Morgan',
      category: 'Estudo',
      image: 'https://images.unsplash.com/photo-1692949962839-b6260b54f499?w=400&q=75'
    },
    {
      id: 23,
      title: 'Humildade',
      author: 'Andrew Murray',
      category: 'Devocional',
      image: 'https://images.unsplash.com/photo-1701385067127-d87d5b3243ca?w=400&q=75'
    },
    {
      id: 24,
      title: 'Tesouro de Davi',
      author: 'Charles Spurgeon',
      category: 'Salmos',
      image: 'https://images.unsplash.com/photo-1695730823900-c64a64c6ddb9?w=400&q=75'
    },
    {
      id: 25,
      title: 'Bíblia Alpha',
      author: 'Edição Premium',
      category: 'Exclusivo',
      image: 'https://horizons-cdn.hostinger.com/5ded40e0-e222-47e2-bc6a-c4b82260a357/41899e6c7b23aab16478c60c1047a1bd.png',
      url: 'https://bibliaalpha.studiologos.com.br/'
    }
  ];

  const logosPlay = [
    {
      id: 93,
      title: 'Tuyo es el Reino',
      subtitle: 'Jorge Himitian, Pr',
      image: 'https://img.youtube.com/vi/7T_yjhoUFps/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7T_yjhoUFps?si=nDvHykkLrt1bYyIy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 94,
      title: 'El derramamiento del Espíritu Santo sobre toda carne',
      subtitle: 'Jorge Himitian, Pr',
      image: 'https://img.youtube.com/vi/awv-WyYSraI/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/awv-WyYSraI?si=hsIkYSdt3A8IsJk3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 95,
      title: 'Felizes os que se satisfazem em Cristo',
      subtitle: 'Erick Silva, Pr The',
      image: 'https://img.youtube.com/vi/JyU1mUTPju4/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JyU1mUTPju4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 96,
      title: 'Maturidade cristã, uma jornada de amor',
      image: 'https://img.youtube.com/vi/O8bCwgguckI/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/O8bCwgguckI?si=rPpIwapUsV58V_R6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 97,
      title: 'Da torre ao trauma',
      image: 'https://img.youtube.com/vi/3wphjn5k0Y8/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/3wphjn5k0Y8?si=EB6E-wgYMea5lCFA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 98,
      title: 'MINISTRAÇÃO',
      image: 'https://img.youtube.com/vi/EYLjtZlZrqA/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EYLjtZlZrqA?si=KFytrqTeeFHpn6PX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 99,
      title: 'MINISTRAÇÃO',
      subtitle: 'Erick Silva, Pr The',
      description: 'Estudo inicial de Gênesis',
      image: 'https://img.youtube.com/vi/J_HQ1MGRvSE/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/J_HQ1MGRvSE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    },
    {
      id: 100,
      title: 'MINISTRAÇÃO',
      subtitle: 'Erick, Pr The',
      description: 'Gênesis capítulo 8 - Famílias renovadas pelo Espírito Santo',
      image: 'https://img.youtube.com/vi/PA5CNCPF_xo/hqdefault.jpg',
      embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/PA5CNCPF_xo?si=ubwXo3jf72-9bBW6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    },
    {
      id: 101,
      title: 'Introdução à Teologia Sistemática',
      description: 'Uma jornada visual e exegética pelos pilares fundamentais da fé cristã em uma abordagem estruturada.',
      image: 'https://images.unsplash.com/photo-1694878982378-4fc7fb9ca415?w=600&q=75'
    },
    {
      id: 102,
      title: 'Fundamentos da Fé Cristã',
      description: 'Explore as doutrinas essenciais que moldaram a igreja desde as origens.',
      image: 'https://images.unsplash.com/photo-1694878982232-b4a5ead0b4e4?w=600&q=75'
    },
    {
      id: 103,
      title: 'Estudo do Evangelho de João',
      description: 'Uma imersão detalhada e expositiva nas Escrituras do quarto evangelho.',
      image: 'https://images.unsplash.com/photo-1663124178647-24f30cedd1ba?w=600&q=75'
    },
    {
      id: 104,
      title: 'Doutrina da Salvação',
      description: 'Aprofunde-se no profundo entendimento da graça, justificação e redenção divina.',
      image: 'https://images.unsplash.com/photo-1694878981850-3bdc97ecb2bc?w=600&q=75'
    },
    {
      id: 105,
      title: 'História da Igreja Cristã',
      description: 'Uma rica viagem cronológica pelos marcos decisivos que desenharam a igreja moderna.',
      image: 'https://images.unsplash.com/photo-1649109599393-8f562dd1a86c?w=600&q=75'
    }
  ];

  return (
    <>
      <Helmet>
        <title>StudioLogos - Biblioteca Teológica Premium</title>
        <meta name="description" content="A coleção definitiva de sabedoria teológica. Explore obras raras, comentários clássicos e a exclusiva Bíblia Alpha." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <HeroSection />

          <div className="py-16 md:py-24 space-y-4">
            <Shelf 
              title="Mais Acessados" 
              items={maisAcessados} 
              cardType="product" 
            />

            <Shelf 
              title="Ebooks Cristãos" 
              items={ebooksCristaos} 
              cardType="product" 
            />

            <Shelf 
              title="Teologia Sistemática" 
              items={teologia} 
              cardType="product" 
            />

            <Shelf 
              title="Sermões & Devocionais" 
              items={devocionais} 
              cardType="product" 
            />

            <Shelf 
              title="Novidades & Clássicos" 
              items={novidades} 
              cardType="product" 
            />

            <Shelf 
              title="LOGOS PLAY" 
              items={logosPlay} 
              cardType="video" 
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
