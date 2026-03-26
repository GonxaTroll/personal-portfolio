import { useEffect, useRef, useState } from 'react'
import {
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
} from 'lucide-react'

import './App.css'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Experience = {
  id: number
  title: string
  company: string
  period: string
  skills: string[]
  description: string
  tasks: string[]
}

type Project = {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  image: string
  url: string
  tags: string[]
}

type Contribution = {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  image: string
  url: string
  tags: string[]
  subItems: {
    name: string
    description: string
    url: string
  }[]
}

type CertificationProvider = {
  provider: string
  logo: string
  certifications: {
    name: string
    url: string
  }[]
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Data Scientist',
    company: 'New Work SE',
    period: 'Aug 2024 - Jan 2026',
    skills: ['Python', 'Forecasting', 'dbt', 'Snowflake', 'Tableau'],
    description:
      'Owned forecasting and analytics initiatives for job traffic KPIs in support of business planning.',
    tasks: [
      'Developed ML models for KPI forecasting with <15% error and around 8% average error across KPIs.',
      'Built a jobs data mart with dbt and Snowflake as a single source of truth for job traffic.',
      'Delivered business insights through Python analyses and Tableau dashboards.',
    ],
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Solver Intelligent Analytics',
    period: 'Sep 2022 - Jul 2024',
    skills: ['Forecasting', 'FastAPI', 'MySQL', 'Grafana', 'Prometheus'],
    description:
      'Maintained and expanded demand forecasting solutions for retail clients and built internal data products.',
    tasks: [
      'Improved 4-year-old demand forecasting solutions, targeting 20% lower prediction error across additional sales scenarios.',
      'Built an optimization-based automation tool that saved up to 8 hours per week of manual work.',
      'Implemented backend services (FastAPI) and MySQL databases for two internal customer-facing applications.',
      'Set up centralized observability with Grafana, Prometheus and Loki across four projects.',
    ],
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'FERMAX Holding Investment S.L.',
    period: 'Feb 2022 - May 2022',
    skills: ['Clustering', 'Python', 'Power BI', 'Kibana', 'Analytics'],
    description:
      'Applied machine learning and analytics to user segmentation, forecasting context, and anomaly detection.',
    tasks: [
      'Clustered 15,000+ users from Fermax Cloud Blue to guide paid subscription recommendations. Baseline for upcoming ML-based segmentation projects.',
      'Analyzed correlations between macroeconomic variables and sales for forecasting impact assessment.',
      'Created Kibana and Power BI dashboards, including anomaly detection for unusual access spikes, which helped identify a security breach.',
    ],
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'ITACA - UPV',
    period: 'Apr 2021 - Aug 2021',
    skills: ['Data Cleaning', 'Anonymization', 'ETL', 'Process Mining', 'Healthcare Data'],
    description:
      'Prepared sensitive healthcare datasets for analysis and process mining use cases.',
    tasks: [
      'Performed anonymization, cleaning and transformation on datasets with 22,000+ patients with blood clotting disorders from La Fe Hospital.',
      'Delivered analysis-ready data structures for statistical analysis and process mining workflows.',
    ],
  },
]

const projects: Project[] = [
  {
    id: 1,
    title: 'Customer Segmentation',
    shortDesc:
      'Analyzed customer data to identify distinct segments for tailored marketing strategies.',
    fullDesc:
      'Utilized K-means clustering and RFM analysis to segment customers into distinct groups, enabling personalized marketing campaigns that increased conversion rates by 35%.',
    image: '/data-dashboard.png',
    url: 'https://github.com/sophiachen/customer-segmentation',
    tags: ['Python', 'Scikit-learn', 'Pandas'],
  },
  {
    id: 2,
    title: 'Sales Forecasting',
    shortDesc:
      'Developed a model to predict future sales, improving inventory management.',
    fullDesc:
      'Built ARIMA and LSTM models to forecast sales with 92% accuracy, reducing inventory costs by 20% and preventing stockouts during peak seasons.',
    image: '/sales-forecasting-chart-with-trend-lines.jpg',
    url: 'https://github.com/sophiachen/sales-forecasting',
    tags: ['Time Series', 'TensorFlow', 'Prophet'],
  },
  {
    id: 3,
    title: 'Sentiment Analysis',
    shortDesc:
      'Gauged public opinion from social media data to inform product development.',
    fullDesc:
      'Implemented NLP techniques using BERT to analyze 500K+ social media posts, providing actionable insights that shaped product roadmap decisions.',
    image: '/sentiment-analysis-visualization.png',
    url: 'https://github.com/sophiachen/sentiment-analysis',
    tags: ['NLP', 'BERT', 'PyTorch'],
  },
  {
    id: 4,
    title: 'Fraud Detection',
    shortDesc:
      'Built a system to identify and prevent fraudulent financial transactions.',
    fullDesc:
      'Developed an ensemble model combining Random Forest and XGBoost that detected fraudulent transactions with 98% precision, saving the company $2M annually.',
    image: '/coffee-cup-on-desk-workspace.jpg',
    url: 'https://github.com/sophiachen/fraud-detection',
    tags: ['XGBoost', 'Anomaly Detection', 'SQL'],
  },
  {
    id: 5,
    title: 'Healthcare Data Analysis',
    shortDesc:
      'Analyzed healthcare data to identify factors influencing patient outcomes.',
    fullDesc:
      'Performed statistical analysis on 100K+ patient records to identify key factors affecting recovery times, leading to improved treatment protocols.',
    image: '/healthcare-data-visualization.png',
    url: 'https://github.com/sophiachen/healthcare-analysis',
    tags: ['R', 'Statistical Modeling', 'Tableau'],
  },
  {
    id: 6,
    title: 'Recommendation System',
    shortDesc:
      'Designed a product recommendation system for an e-commerce platform.',
    fullDesc:
      'Created a collaborative filtering system that increased average order value by 28% and improved user engagement metrics across the platform.',
    image: '/product-recommendation-system.jpg',
    url: 'https://github.com/sophiachen/recommendation-system',
    tags: ['Collaborative Filtering', 'Spark', 'AWS'],
  },
]

const contributionsDetailed: Contribution[] = [
  {
    id: 1,
    title: 'Research Publications',
    shortDesc:
      'Authored work on optimization methods for automatic team formation.',
    fullDesc:
      'Published research derived from team formation optimization methods, with one paper presented at HAIS 2023 and a follow-up accepted by Neurocomputing.',
    image: '/laptop-with-code.png',
    url: 'https://github.com/GonxaTroll',
    tags: ['Research', 'Optimization', 'Metaheuristics', 'Python'],
    subItems: [
      {
        name: 'Evolutionary Metaheuristic for Team Formation in Classrooms',
        description:
          'Follow-up publication focused on metaheuristic approaches for team formation in classrooms.',
        url: 'https://www.sciencedirect.com/science/article/pii/S0925231225008100',
      },
      {
        name: 'Linear Programming Model for Team Formation in Classrooms',
        description:
          'Paper based on exact optimization methods for team formation in classrooms.',
        url: 'https://link.springer.com/chapter/10.1007/978-3-031-40725-3_34',
      },
    ],
  },
  {
    id: 2,
    title: 'Monitoring and Reliability',
    shortDesc:
      'Designed centralized observability for production data projects.',
    fullDesc:
      'Implemented end-to-end monitoring infrastructure with Grafana, Prometheus, and Loki to speed up issue detection and improve system reliability.',
    image: '/community-building-icon.jpg',
    url: 'https://github.com/GonxaTroll',
    tags: ['Grafana', 'Prometheus', 'Loki', 'Observability'],
    subItems: [
      {
        name: 'Centralized Logging and Metrics',
        description:
          'Connected logs and metrics from four projects into a shared monitoring stack.',
        url: 'https://github.com/GonxaTroll',
      },
      {
        name: 'Operational Dashboards',
        description:
          'Created dashboards and alerts to shorten time-to-detection for production issues.',
        url: 'https://github.com/GonxaTroll',
      },
    ],
  },
  {
    id: 3,
    title: 'Data Products and Automation',
    shortDesc:
      'Delivered practical tooling that reduced manual effort and supported commercial teams.',
    fullDesc:
      'Built internal applications, APIs, and automation tools that improved decision-making and removed repetitive operations in data workflows.',
    image: '/plant-and-open-book.jpg',
    url: 'https://github.com/GonxaTroll',
    tags: ['FastAPI', 'MySQL', 'Optimization', 'Automation'],
    subItems: [
      {
        name: 'Task Automation Tool',
        description:
          'Optimization-based workflow automation that saved up to 8 hours per week.',
        url: 'https://github.com/GonxaTroll',
      },
      {
        name: 'Customer-facing Internal Apps',
        description:
          'Implemented backend and data layer for applications used by 20+ retail professionals.',
        url: 'https://github.com/GonxaTroll',
      },
    ],
  },
  {
    id: 4,
    title: 'Technical Blog Posts',
    shortDesc:
      'Published articles on data science topics, sharing insights and tutorials.',
    fullDesc:
      'Authored 50+ technical articles on Medium and personal blog, reaching 100K+ readers monthly with tutorials on ML algorithms and best practices.',
    image: '/blog-post-document.jpg',
    url: 'https://medium.com/@sophiachen',
    tags: ['Technical Writing', 'Education', 'Content Creation'],
    subItems: [
      {
        name: 'Understanding Transformer Architecture',
        description:
          'Deep dive into attention mechanisms and transformer models',
        url: 'https://medium.com/@sophiachen/transformers',
      },
      {
        name: 'MLOps Best Practices',
        description:
          'Guide to deploying and monitoring ML models in production',
        url: 'https://medium.com/@sophiachen/mlops',
      },
      {
        name: 'Data Visualization with Python',
        description:
          'Comprehensive tutorial on creating impactful visualizations',
        url: 'https://medium.com/@sophiachen/dataviz',
      },
    ],
  },
  {
    id: 5,
    title: 'Data Science Competitions',
    shortDesc:
      'Participated in data science competitions, achieving top rankings in several challenges.',
    fullDesc:
      'Kaggle Competitions Master with 3 gold medals and 5 silver medals. Ranked in top 1% globally with expertise in computer vision and NLP challenges.',
    image: '/data-science-competition.jpg',
    url: 'https://www.kaggle.com/sophiachen',
    tags: ['Kaggle', 'Competitions', 'Problem Solving'],
    subItems: [
      {
        name: 'Image Classification Challenge - 1st Place',
        description:
          'Won gold medal with 98.5% accuracy on medical image classification',
        url: 'https://www.kaggle.com/competitions/image-classification',
      },
      {
        name: 'NLP Sentiment Analysis - 2nd Place',
        description: 'Silver medal for sentiment analysis on social media data',
        url: 'https://www.kaggle.com/competitions/sentiment-analysis',
      },
      {
        name: 'Time Series Forecasting - 1st Place',
        description: 'Gold medal for predicting sales across multiple stores',
        url: 'https://www.kaggle.com/competitions/time-series',
      },
      {
        name: 'Computer Vision Object Detection - 3rd Place',
        description:
          'Bronze medal for detecting objects in autonomous driving scenarios',
        url: 'https://www.kaggle.com/competitions/object-detection',
      },
    ],
  },
  {
    id: 6,
    title: 'Workshop Facilitation',
    shortDesc:
      'Designed and led workshops on advanced data visualization techniques for professionals.',
    fullDesc:
      'Conducted 15+ workshops for Fortune 500 companies on data visualization, storytelling with data, and dashboard design, training 500+ professionals.',
    image: '/workshop-presentation.png',
    url: 'https://www.sophiachen.com/workshops',
    tags: ['Training', 'Data Visualization', 'Tableau'],
    subItems: [
      {
        name: 'Data Storytelling Workshop',
        description: '2-day workshop on creating compelling data narratives',
        url: 'https://www.sophiachen.com/workshops/storytelling',
      },
      {
        name: 'Advanced Tableau Training',
        description:
          'Hands-on training for creating interactive dashboards',
        url: 'https://www.sophiachen.com/workshops/tableau',
      },
      {
        name: 'Python for Data Visualization',
        description:
          'Workshop covering matplotlib, seaborn, and plotly',
        url: 'https://www.sophiachen.com/workshops/python-viz',
      },
    ],
  },
]

const certificationsByProvider: CertificationProvider[] = [
  {
    provider: 'Microsoft',
    logo: '/microsoft-azure-logo.png',
    certifications: [
      {
        name: 'DP-100',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/',
      },
      {
        name: 'AI-900',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
      },
      {
        name: 'PL-900',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/',
      },
    ],
  },
  {
    provider: 'Reinforcement Learning',
    logo: '/reinforcement-learning.png',
    certifications: [
      {
        name: 'Beginner to Master - AI in Python',
        url: 'https://www.udemy.com/certificate/UC-fe8abba3-029a-4d99-b95b-20faf1cbc85f/',
      },
    ],
  },
  {
    provider: 'Software Engineering',
    logo: '/software-engineering.png',
    certifications: [
      {
        name: 'Git + GitHub: Todo un sistema de control de versiones desde cero',
        url: 'https://www.udemy.com/certificate/UC-24e96bcb-a6f7-4f2f-81f2-dc80b174b91c/',
      },
      {
        name: 'Docker, de principiante a experto',
        url: 'https://www.udemy.com/certificate/UC-f42d98e9-2f71-46ab-9a3c-d8237dbb9ef9/',
      },
    ],
  },
]

function scrollToId(id: string, onDone?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  if (onDone) {
    window.setTimeout(onDone, 100)
  }
}

function resolveAssetUrl(path: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:')) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

function getStartYear(period: string) {
  const yearMatch = period.match(/\b(19|20)\d{2}\b/)
  return yearMatch?.[0] ?? ''
}

const experienceSkillChipClassName =
  'shrink-0 rounded-full border border-primary/45 bg-primary/15 px-2.5 py-1 text-xs font-medium text-slate-100'

function App() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [hoveredContribution, setHoveredContribution] = useState<number | null>(null)
  const [selectedContribution, setSelectedContribution] =
    useState<Contribution | null>(null)
  const [hoveredSubItem, setHoveredSubItem] = useState<number | null>(null)
  const [certificationIndex, setCertificationIndex] = useState(0)
  const [hoveredCertIndex, setHoveredCertIndex] = useState<string | null>(null)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [showAllExperiences, setShowAllExperiences] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllContributions, setShowAllContributions] = useState(false)
  const [selectedProviderCerts, setSelectedProviderCerts] =
    useState<CertificationProvider | null>(null)
  const [visibleSkillCountByExp, setVisibleSkillCountByExp] = useState<
    Record<number, number>
  >({})
  const [activeTimelineHeight, setActiveTimelineHeight] = useState(0)
  const aboutRef = useRef<HTMLElement | null>(null)
  const skillRowRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const experienceTimelineRef = useRef<HTMLDivElement | null>(null)
  const experienceCardRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute('data-index') ?? '0',
              10,
            )
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const items = document.querySelectorAll('.timeline-item')
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [showAllExperiences])

  useEffect(() => {
    const activeExpId = hoveredExp

    if (activeExpId === null) {
      setActiveTimelineHeight(0)
      return
    }

    const timelineContainer = experienceTimelineRef.current
    const activeCard = experienceCardRefs.current[activeExpId]

    if (!timelineContainer || !activeCard) {
      return
    }

    const updateActiveHeight = () => {
      const containerRect = timelineContainer.getBoundingClientRect()
      const cardRect = activeCard.getBoundingClientRect()
      const nextHeight = Math.max(cardRect.bottom - containerRect.top, 0)
      setActiveTimelineHeight(nextHeight)
    }

    updateActiveHeight()
    window.addEventListener('resize', updateActiveHeight)

    return () => window.removeEventListener('resize', updateActiveHeight)
  }, [hoveredExp, showAllExperiences])

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) {
        return
      }

      const aboutBottom = aboutRef.current.getBoundingClientRect().bottom
      setShowStickyHeader(aboutBottom < 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visibleCertifications = certificationsByProvider.slice(
    certificationIndex,
    certificationIndex + 5,
  )

  const displayedExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 3)
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)
  const displayedContributions = showAllContributions
    ? contributionsDetailed
    : contributionsDetailed.slice(0, 3)

  useEffect(() => {
    const chipGap = 6
    const widthCache = new Map<string, number>()

    const measureChipWidth = (label: string) => {
      const cached = widthCache.get(label)
      if (cached !== undefined) {
        return cached
      }

      const probe = document.createElement('span')
      probe.className = experienceSkillChipClassName
      probe.textContent = label
      probe.style.position = 'absolute'
      probe.style.visibility = 'hidden'
      probe.style.pointerEvents = 'none'
      probe.style.whiteSpace = 'nowrap'
      document.body.appendChild(probe)
      const width = Math.ceil(probe.getBoundingClientRect().width)
      document.body.removeChild(probe)
      widthCache.set(label, width)

      return width
    }

    const calculateVisibleSkillCount = (skills: string[], containerWidth: number) => {
      if (containerWidth <= 0 || skills.length === 0) {
        return skills.length
      }

      const skillWidths = skills.map((skill) => measureChipWidth(skill))

      for (let visibleCount = skills.length; visibleCount >= 0; visibleCount -= 1) {
        const hiddenCount = skills.length - visibleCount
        const hiddenBadgeWidth =
          hiddenCount > 0 ? measureChipWidth(`+${hiddenCount}`) : 0

        let requiredWidth = 0

        for (let index = 0; index < visibleCount; index += 1) {
          requiredWidth += skillWidths[index]
        }

        if (visibleCount > 1) {
          requiredWidth += chipGap * (visibleCount - 1)
        }

        if (hiddenCount > 0) {
          requiredWidth += hiddenBadgeWidth
          if (visibleCount > 0) {
            requiredWidth += chipGap
          }
        }

        if (requiredWidth <= containerWidth) {
          return visibleCount
        }
      }

      return 0
    }

    const updateVisibleSkillCounts = () => {
      setVisibleSkillCountByExp((current) => {
        let hasChanges = false
        const next: Record<number, number> = { ...current }

        displayedExperiences.forEach((exp) => {
          const skillRow = skillRowRefs.current[exp.id]
          const availableWidth = skillRow?.clientWidth ?? 0
          const fittedSkillCount = calculateVisibleSkillCount(
            exp.skills,
            availableWidth,
          )

          if (next[exp.id] !== fittedSkillCount) {
            next[exp.id] = fittedSkillCount
            hasChanges = true
          }
        })

        return hasChanges ? next : current
      })
    }

    const frame = window.requestAnimationFrame(updateVisibleSkillCounts)
    const observer = new ResizeObserver(updateVisibleSkillCounts)

    displayedExperiences.forEach((exp) => {
      const skillRow = skillRowRefs.current[exp.id]
      if (skillRow) {
        observer.observe(skillRow)
      }
    })

    window.addEventListener('resize', updateVisibleSkillCounts)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', updateVisibleSkillCounts)
    }
  }, [showAllExperiences])

  return (
    <div className="page-bg isolate min-h-screen text-foreground">
      <div aria-hidden="true" className="page-glow pointer-events-none fixed inset-0 -z-10" />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/75 shadow-[0_8px_32px_rgba(0,0,0,0.40)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <button
            type="button"
            className={`flex items-center gap-3 transition-all duration-300 ${
              showStickyHeader ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={() => scrollToId('about')}
          >
            <img
              src={resolveAssetUrl('/images/design-mode/about_me_screen.png')}
              alt="Gonzalo Candel"
              className="h-10 w-10 rounded-full border-2 border-primary object-cover"
            />
            <span className="text-left">
              <span className="block text-sm font-bold text-white">
                Gonzalo Candel
              </span>
              <span className="block text-xs text-primary">Data Scientist</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 text-sm md:flex">
            {['experience', 'projects', 'contributions', 'certifications'].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="relative rounded-md px-3 py-1.5 capitalize text-slate-400 transition-colors duration-200 hover:text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
                  onClick={() => scrollToId(item)}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="w-40" aria-hidden="true" />
        </div>
      </nav>

      <section
        id="about"
        ref={aboutRef}
        className="section-glow px-4 pb-24 pt-28 sm:px-6 sm:pt-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
            {/* Left: photo + name + stats */}
            <div className="flex flex-col items-center gap-6">
              {/* Photo frame */}
              <div className="h-56 w-56 overflow-hidden rounded-full border-4 border-primary sm:h-64 sm:w-64">
                <img
                  src={resolveAssetUrl('/images/design-mode/about_me_screen.png')}
                  alt="Gonzalo Candel"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name + role */}
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Gonzalo Candel
                </h1>
                <p className="mt-1.5 text-lg text-primary">
                  Data Scientist · ML &amp; Optimization
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid w-full grid-cols-3 gap-2">
                <div className="rounded-xl border border-border/60 bg-card/40 p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">4+</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Yrs Exp.</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">3</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Companies</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">2</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Publications</p>
                </div>
              </div>
            </div>

            {/* Right: bio card + core stack + actions */}
            <div className="space-y-6">
              {/* Bio in glass card */}
              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <p className="text-lg leading-relaxed text-slate-200">
                  Data Scientist with experience in forecasting, optimization, and
                  analytics, working across product and business teams to turn data
                  into measurable outcomes.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  Skilled in Python, SQL, and ML tooling, with hands-on delivery in
                  dbt/Snowflake pipelines, FastAPI services, and observability
                  systems. I enjoy building robust solutions that improve strategic
                  decision-making.
                </p>
              </div>

              {/* Core stack chips */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'SQL', 'dbt', 'Snowflake', 'Pandas', 'Scikit-learn', 'FastAPI', 'Docker', 'Tableau'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm text-primary/90"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Download resume */}
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:brightness-110"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = resolveAssetUrl('/CV_Gonzalo.pdf')
                  link.download = 'CV_Gonzalo.pdf'
                  link.click()
                }}
              >
                <Download className="h-5 w-5" />
                Download Resume
              </Button>

              {/* Connect */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                  Connect
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 bg-secondary text-foreground hover:bg-secondary/90 hover:text-white"
                    onClick={() =>
                      window.open(
                        'https://www.linkedin.com/in/gonzalo-candel-peir%C3%B3/',
                        '_blank',
                      )
                    }
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V23h-4v-7.02c0-1.67-.03-3.82-2.33-3.82-2.34 0-2.7 1.82-2.7 3.7V23h-4V8Z" />
                    </svg>
                    LinkedIn
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 bg-secondary text-foreground hover:bg-secondary/90 hover:text-white"
                    onClick={() =>
                      window.open('https://github.com/GonxaTroll', '_blank')
                    }
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.68 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.5.11-3.12 0 0 .98-.31 3.2 1.19A11.1 11.1 0 0 1 12 6.1c.98 0 1.97.13 2.89.39 2.22-1.5 3.2-1.2 3.2-1.2.64 1.63.24 2.83.12 3.13.75.81 1.2 1.85 1.2 3.11 0 4.42-2.69 5.38-5.25 5.66.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    GitHub
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 bg-secondary text-foreground hover:bg-secondary/90 hover:text-white"
                    onClick={() =>
                      window.open('https://www.kaggle.com/gonxatroll', '_blank')
                    }
                  >
                    <span className="text-sm font-bold">K</span>
                    Kaggle
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 bg-secondary text-foreground hover:bg-secondary/90 hover:text-white"
                    onClick={() => {
                      window.location.href = 'mailto:gonzalo.canpei@gmail.com'
                    }}
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-shell px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">
              Professional Experience
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Career Timeline
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300 sm:text-xl">
              Key roles where I built production-ready data products,
              forecasting systems, and decision intelligence.
            </p>
          </div>

          <div className="relative" ref={experienceTimelineRef}>
            <div className="timeline-line absolute bottom-0 left-6 top-0 w-px md:left-1/2 md:-translate-x-1/2" />
            <div
              className="timeline-line-active pointer-events-none absolute left-6 w-px md:left-1/2 md:-translate-x-1/2"
              style={{
                height: `${activeTimelineHeight}px`,
                opacity: activeTimelineHeight > 0 ? 1 : 0,
              }}
            />

            <div className="space-y-8">
              {displayedExperiences.map((exp, index) => {
                const isRight = index % 2 === 1
                const startYear = getStartYear(exp.period)
                const previousStartYear =
                  index > 0
                    ? getStartYear(displayedExperiences[index - 1].period)
                    : ''
                const showYearBadge = Boolean(
                  startYear && (index === 0 || startYear !== previousStartYear),
                )
                const visibleSkillCount =
                  visibleSkillCountByExp[exp.id] ?? exp.skills.length
                const hiddenSkillCount = Math.max(
                  exp.skills.length - visibleSkillCount,
                  0,
                )

                return (
                  <div
                    key={exp.id}
                    data-index={index}
                    className={`timeline-item group/exp relative flex pl-16 transition-all duration-700 md:pl-0 ${
                      isRight ? 'md:justify-end' : 'md:justify-start'
                    } ${
                      index > 0 ? 'md:-mt-7' : ''
                    } ${
                      hoveredExp === exp.id ? 'z-20' : 'z-10'
                    } ${
                      visibleItems.includes(index)
                        ? 'translate-y-0 opacity-100'
                        : isRight
                          ? 'translate-y-4 opacity-0 md:translate-x-10'
                          : 'translate-y-4 opacity-0 md:-translate-x-10'
                    }`}
                  >
                    {showYearBadge && (
                      <div className="timeline-year-guide absolute left-0 right-0 top-12 hidden md:block" />
                    )}
                    {showYearBadge && (
                      <span
                        className={`absolute top-[2.1rem] z-10 hidden rounded-full border border-slate-600/70 bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 md:block ${
                          isRight
                            ? 'left-1/2 -translate-x-[calc(100%+3.4rem)]'
                            : 'left-1/2 translate-x-[3.4rem]'
                        }`}
                      >
                        {startYear}
                      </span>
                    )}

                    <div
                      className={`timeline-connector absolute top-12 hidden h-px w-8 md:block ${
                        isRight ? 'left-1/2 ml-6' : 'right-1/2 mr-6'
                      }`}
                      style={{
                        opacity: hoveredExp === exp.id ? 1 : 0.35,
                        background:
                          hoveredExp === exp.id
                            ? 'linear-gradient(90deg, rgba(120, 193, 255, 0.95), rgba(17, 115, 212, 0.88))'
                            : undefined,
                        boxShadow:
                          hoveredExp === exp.id
                            ? '0 0 16px rgba(69, 161, 242, 0.72)'
                            : '0 0 0 rgba(17, 115, 212, 0)',
                      }}
                    />

                    <div
                      className={`absolute left-0 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background shadow-[0_0_0_6px_rgba(16,25,34,0.45)] transition-transform md:left-1/2 md:-translate-x-1/2 ${
                        hoveredExp === exp.id ? 'scale-110' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: index === 0 ? '#1173d4' : '#1e2a3a',
                      }}
                    >
                      <Briefcase
                        className="h-6 w-6"
                        style={{ color: index === 0 ? '#ffffff' : '#696c73' }}
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full text-left md:w-[calc(50%-2.25rem)]"
                      ref={(element) => {
                        experienceCardRefs.current[exp.id] = element
                      }}
                      aria-label={`Open details for ${exp.title} at ${exp.company}`}
                      onMouseEnter={() => setHoveredExp(exp.id)}
                      onMouseLeave={() => setHoveredExp(null)}
                      onClick={() => setSelectedExp(exp)}
                    >
                      <div className="experience-card rounded-2xl border border-slate-700/70 bg-[linear-gradient(140deg,rgba(30,42,58,0.78),rgba(16,25,34,0.7))] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[0_20px_50px_rgba(17,115,212,0.2)] focus-visible:border-primary/70">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-primary">{exp.company}</p>
                          <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200">
                            {exp.period}
                          </span>
                        </div>

                        <h3 className="mt-3 text-2xl font-bold text-white">
                          {exp.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          {exp.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div
                            ref={(element) => {
                              skillRowRefs.current[exp.id] = element
                            }}
                            className="flex min-w-0 flex-1 flex-nowrap gap-1.5 overflow-hidden"
                          >
                            {exp.skills.slice(0, visibleSkillCount).map((skill) => (
                              <span
                                key={skill}
                                className={experienceSkillChipClassName}
                              >
                                {skill}
                              </span>
                            ))}
                            {hiddenSkillCount > 0 && (
                              <span className={experienceSkillChipClassName}>
                                +{hiddenSkillCount}
                              </span>
                            )}
                          </div>

                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-all duration-300 group-hover/exp:border-primary/70 group-hover/exp:bg-primary/25"
                            style={{
                              borderColor:
                                hoveredExp === exp.id
                                  ? 'rgba(17, 115, 212, 0.9)'
                                  : undefined,
                              backgroundColor:
                                hoveredExp === exp.id
                                  ? 'rgba(17, 115, 212, 0.28)'
                                  : undefined,
                            }}
                            aria-hidden="true"
                          >
                            <ChevronRight
                              className="h-4 w-4 transition-transform duration-300"
                              style={{
                                transform:
                                  hoveredExp === exp.id
                                    ? 'translateX(3px)'
                                    : 'translateX(0)',
                              }}
                            />
                          </span>
                          <span className="sr-only">View details</span>
                        </div>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {experiences.length > 3 && !showAllExperiences && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowAllExperiences(true)}
                className="gap-2 bg-primary text-white"
              >
                Show All Experiences
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="projects" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Projects
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl">
              Explore a selection of my data science projects, showcasing my
              skills and experience in various domains.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <article
                key={project.id}
                className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl border border-border transition-all hover:scale-[1.02] hover:shadow-2xl"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => window.open(project.url, '_blank')}
              >
                <img
                  src={resolveAssetUrl(project.image)}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,25,34,0.97)_0%,rgba(16,25,34,0.55)_100%)]" />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-500"
                  style={{
                    transform:
                      hoveredProject === project.id
                        ? 'translateY(-20px)'
                        : 'translateY(0)',
                  }}
                >
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mb-3 mt-2 text-sm text-slate-200">
                    {hoveredProject === project.id
                      ? project.fullDesc
                      : project.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-primary px-2 py-1 text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {projects.length > 3 && !showAllProjects && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowAllProjects(true)}
                className="gap-2 bg-primary text-white"
              >
                Show All Projects
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="contributions" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Contributions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedContributions.map((contribution) => (
              <article
                key={contribution.id}
                className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl border border-border transition-all hover:scale-[1.02] hover:shadow-2xl"
                onMouseEnter={() => setHoveredContribution(contribution.id)}
                onMouseLeave={() => setHoveredContribution(null)}
                onClick={() => setSelectedContribution(contribution)}
              >
                <img
                  src={resolveAssetUrl(contribution.image)}
                  alt={contribution.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,25,34,0.97)_0%,rgba(16,25,34,0.55)_100%)]" />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-500"
                  style={{
                    transform:
                      hoveredContribution === contribution.id
                        ? 'translateY(-20px)'
                        : 'translateY(0)',
                  }}
                >
                  <h3 className="text-xl font-bold text-white">
                    {contribution.title}
                  </h3>
                  <p className="mb-3 mt-2 text-sm text-slate-200">
                    {hoveredContribution === contribution.id
                      ? contribution.fullDesc
                      : contribution.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contribution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-primary px-2 py-1 text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {contributionsDetailed.length > 3 && !showAllContributions && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowAllContributions(true)}
                className="gap-2 bg-primary text-white"
              >
                Show All Contributions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="certifications" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Certifications
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl">
              Professional certifications demonstrating expertise across
              various data science platforms and technologies.
            </p>
          </div>

          <div className="relative px-8">
            <button
              type="button"
              onClick={() =>
                setCertificationIndex((current) => Math.max(current - 1, 0))
              }
              disabled={certificationIndex === 0}
              className="absolute left-0 top-1/2 z-10 -translate-x-2 -translate-y-1/2 rounded-full bg-primary p-3 text-white transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() =>
                setCertificationIndex((current) =>
                  current + 5 < certificationsByProvider.length
                    ? current + 1
                    : current,
                )
              }
              disabled={certificationIndex + 5 >= certificationsByProvider.length}
              className="absolute right-0 top-1/2 z-10 translate-x-2 -translate-y-1/2 rounded-full bg-primary p-3 text-white transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {visibleCertifications.map((provider) => (
                <div
                  key={provider.provider}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <div className="mb-3 flex flex-col items-center">
                    <div className="mb-2 flex h-20 w-20 items-center justify-center">
                      <img
                        src={resolveAssetUrl(provider.logo)}
                        alt={provider.provider}
                        className="max-h-20 max-w-20 object-contain"
                      />
                    </div>
                    <h3 className="text-center text-sm font-bold text-white">
                      {provider.provider}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {provider.certifications.slice(0, 2).map((cert, idx) => (
                      <button
                        key={cert.name}
                        type="button"
                        className="w-full rounded-lg p-2 text-left transition-all"
                        style={{
                          backgroundColor:
                            hoveredCertIndex === `${provider.provider}-${idx}`
                              ? '#1173d4'
                              : '#101922',
                        }}
                        onMouseEnter={() =>
                          setHoveredCertIndex(`${provider.provider}-${idx}`)
                        }
                        onMouseLeave={() => setHoveredCertIndex(null)}
                        onClick={() => window.open(cert.url, '_blank')}
                      >
                        <span className="line-clamp-2 text-xs text-white">
                          {cert.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {provider.certifications.length > 2 && (
                    <button
                      type="button"
                      className="mt-2 w-full text-right text-xs text-primary transition-colors hover:underline"
                      onClick={() => setSelectedProviderCerts(provider)}
                    >
                      See more →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="mb-8 text-center text-2xl font-bold text-white">
              Languages
            </h3>
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-4">
              {[
                { language: 'Spanish', level: 'Native' },
                { language: 'English', level: 'C2' },
                { language: 'Chinese', level: 'HSK 2' },
              ].map(({ language, level }) => (
                <div
                  key={language}
                  className="flex min-w-40 flex-col items-center rounded-2xl border border-border bg-card px-8 py-5"
                >
                  <span className="text-base font-semibold text-white">
                    {language}
                  </span>
                  <span className="mt-1 text-sm text-primary">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p>© 2026 Gonzalo Candel. All rights reserved.</p>
        </div>
      </footer>

      <Dialog open={!!selectedExp} onOpenChange={() => setSelectedExp(null)}>
        <DialogContent
          className="max-w-2xl border-primary/30 bg-[linear-gradient(150deg,rgba(30,42,58,0.95),rgba(16,25,34,0.95))] shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
          showCloseButton
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {selectedExp?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {selectedExp?.company} | {selectedExp?.period}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-primary">
                Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp?.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-sm text-slate-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-primary">
                Key Responsibilities & Achievements
              </h4>
              <p className="mb-3">{selectedExp?.description}</p>
              <ul className="space-y-2">
                {selectedExp?.tasks.map((task) => (
                  <li key={task} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedContribution}
        onOpenChange={() => setSelectedContribution(null)}
      >
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {selectedContribution?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedContribution?.fullDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {selectedContribution?.subItems.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                className="rounded-lg border border-border p-4 text-left transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor:
                    hoveredSubItem === idx ? '#1e2a3a' : '#101922',
                }}
                onMouseEnter={() => setHoveredSubItem(idx)}
                onMouseLeave={() => setHoveredSubItem(null)}
                onClick={() => window.open(item.url, '_blank')}
              >
                <h4 className="mb-2 font-semibold text-white">{item.name}</h4>
                <p className="text-sm">{item.description}</p>
                {hoveredSubItem === idx && (
                  <p className="mt-2 text-xs text-primary">Click to view →</p>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedProviderCerts}
        onOpenChange={() => setSelectedProviderCerts(null)}
      >
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl text-white">
              {selectedProviderCerts && (
                <>
                  <img
                    src={resolveAssetUrl(selectedProviderCerts.logo)}
                    alt={selectedProviderCerts.provider}
                    className="h-10 w-10 object-contain"
                  />
                  {selectedProviderCerts.provider} Certifications
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              All certifications from {selectedProviderCerts?.provider}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {selectedProviderCerts?.certifications.map((cert, idx) => (
              <button
                key={cert.name}
                type="button"
                className="w-full rounded-lg border border-border p-4 text-left transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor:
                    hoveredCertIndex === `modal-${idx}` ? '#1e2a3a' : '#101922',
                }}
                onMouseEnter={() => setHoveredCertIndex(`modal-${idx}`)}
                onMouseLeave={() => setHoveredCertIndex(null)}
                onClick={() => window.open(cert.url, '_blank')}
              >
                <p className="font-semibold text-white">{cert.name}</p>
                {hoveredCertIndex === `modal-${idx}` && (
                  <p className="mt-2 text-xs text-primary">
                    Click to view certification →
                  </p>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
