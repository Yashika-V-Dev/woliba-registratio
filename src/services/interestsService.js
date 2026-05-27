import apiClient from '../api/apiClient'
import { API_ENDPOINTS } from '../api/endpoints'

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const MOCK_INTERESTS = [
  { id: 1,  name: 'Aerobics',        interest_type: 'Individual Sports', background_color: '#92A4DA' },
  { id: 2,  name: 'Ballet',          interest_type: 'Individual Sports', background_color: '#DA92C8' },
  { id: 3,  name: 'Calisthenics',    interest_type: 'Individual Sports', background_color: '#C8515A' },
  { id: 4,  name: 'Dance',           interest_type: 'Individual Sports', background_color: '#92DAA4' },
  { id: 5,  name: 'Gymnastics',      interest_type: 'Individual Sports', background_color: '#DAC892' },
  { id: 6,  name: 'Hiking',          interest_type: 'Individual Sports', background_color: '#92C8DA' },
  { id: 7,  name: 'Obstacle Racing', interest_type: 'Individual Sports', background_color: '#C8515A' },
  { id: 8,  name: 'Pilates',         interest_type: 'Individual Sports', background_color: '#A4DA92' },
  { id: 9,  name: 'Running',         interest_type: 'Individual Sports', background_color: '#DAA492' },
  { id: 10, name: 'Walking',         interest_type: 'Individual Sports', background_color: '#92A4DA' },
  { id: 11, name: 'Yoga',            interest_type: 'Individual Sports', background_color: '#C8A4DA' },
  { id: 12, name: 'Basketball',      interest_type: 'Ball Sports',       background_color: '#DA9292' },
  { id: 13, name: 'Football',        interest_type: 'Ball Sports',       background_color: '#92DAC8' },
  { id: 14, name: 'Tennis',          interest_type: 'Ball Sports',       background_color: '#DAD492' },
  { id: 15, name: 'Volleyball',      interest_type: 'Ball Sports',       background_color: '#92B4DA' },
  { id: 16, name: 'Cycling',         interest_type: 'Wheel Sports',      background_color: '#DA92B4' },
  { id: 17, name: 'Skateboarding',   interest_type: 'Wheel Sports',      background_color: '#B4DA92' },
  { id: 18, name: 'Boxing',          interest_type: 'Combat Training',   background_color: '#DAB492' },
  { id: 19, name: 'Martial Arts',    interest_type: 'Combat Training',   background_color: '#92DAB4' },
  { id: 20, name: 'Weight Training', interest_type: 'Resistance Training', background_color: '#B492DA' },
  { id: 21, name: 'CrossFit',        interest_type: 'Resistance Training', background_color: '#92DAD4' },
  { id: 22, name: 'Skiing',          interest_type: 'Winter Sports',     background_color: '#DAD492' },
  { id: 23, name: 'Snowboarding',    interest_type: 'Winter Sports',     background_color: '#92C4DA' },
  { id: 24, name: 'Swimming',        interest_type: 'Water Sports',      background_color: '#4AC8C8' },
  { id: 25, name: 'Surfing',         interest_type: 'Water Sports',      background_color: '#92D4DA' },
  { id: 26, name: 'Meditation',      interest_type: 'Other Sports',      background_color: '#D492DA' },
  { id: 27, name: 'Rock Climbing',   interest_type: 'Other Sports',      background_color: '#DAA4C8' },
]

const MOCK_PILLARS = [
  { id: 1,  pillar_title: 'Physical Wellbeing',      description: 'Energy, movement, sleep, and routine care', is_active: 1 },
  { id: 2,  pillar_title: 'Mental Wellbeing',        description: 'Clarity, focus, and mindfulness', is_active: 1 },
  { id: 3,  pillar_title: 'Emotional Wellbeing',     description: 'Resilience, self-awareness, and stress regulation', is_active: 1 },
  { id: 4,  pillar_title: 'Social Wellbeing',        description: 'Relationships and meaningful connection', is_active: 1 },
  { id: 5,  pillar_title: 'Intellectual Wellbeing',  description: 'Growth, creativity, and learning', is_active: 1 },
  { id: 6,  pillar_title: 'Occupational Wellbeing',  description: 'Purpose, performance, and work-life balance', is_active: 1 },
  { id: 7,  pillar_title: 'Spiritual Wellbeing',     description: 'Values, meaning, and inner alignment', is_active: 1 },
  { id: 8,  pillar_title: 'Environmental Wellbeing', description: 'Healthy, safe, and productive surroundings', is_active: 1 },
  { id: 9,  pillar_title: 'Purpose & Contribution',  description: 'Giving back and living with meaning', is_active: 1 },
  { id: 10, pillar_title: 'Longevity',               description: 'A sustainable, healthy lifestyle for the long term', is_active: 1 },
  { id: 11, pillar_title: 'Nutritional Wellbeing',   description: 'Fuelling your body and brain with intention', is_active: 1 },
  { id: 12, pillar_title: 'Financial Wellbeing',     description: 'Security, budgeting, and long-term stability', is_active: 1 },
]

export const interestsService = {
  getWellnessInterests: async () => {
    if (USE_MOCK) {
      await delay(1000)
      return MOCK_INTERESTS
    }
    const res = await apiClient.get(API_ENDPOINTS.VIEW_WELLNESS_INTEREST)
    return res?.data || []
  },

  getWellbeingPillars: async () => {
    if (USE_MOCK) {
      await delay(800)
      return MOCK_PILLARS
    }
    const res = await apiClient.get(API_ENDPOINTS.VIEW_WELLBEING_PILLARS)
    return res?.data || []
  },
}
