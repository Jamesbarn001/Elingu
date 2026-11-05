-- ══════════════════════════════════════════════════════════════
-- ELINGU INSTITUTIONAL & SOCRATIC DATABASE SCHEMA
-- Compatible with PostgreSQL (Production) and SQLite (Local / Dev)
-- ══════════════════════════════════════════════════════════════

-- 1. Schools (Institutional Topology & Hierarchy)
CREATE TABLE IF NOT EXISTS schools (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  county VARCHAR(64) NOT NULL,
  admin_code VARCHAR(64) UNIQUE NOT NULL,
  grades TEXT NOT NULL,          -- JSON array of grades, e.g. [7, 8]
  streams TEXT NOT NULL,         -- JSON map of streams, e.g. {"7": ["East", "West"]}
  join_codes TEXT NOT NULL,      -- JSON map of stream join codes, e.g. {"7_East": "KUJ-7E"}
  created_by VARCHAR(128),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schools_admin_code ON schools(admin_code);

-- 2. Teachers & School Administrators
CREATE TABLE IF NOT EXISTS teachers (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  id_number VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(64) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'subject_teacher',
  school_id VARCHAR(64) NOT NULL,
  school_name VARCHAR(255),
  assignments TEXT NOT NULL DEFAULT '[]', -- JSON array of stream assignments
  failed_login_attempts INT DEFAULT 0,
  locked_until TEXT,
  created_at TEXT NOT NULL,
  last_active TEXT NOT NULL,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_teachers_school_id ON teachers(school_id);
CREATE INDEX IF NOT EXISTS idx_teachers_id_number ON teachers(id_number);
CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email);
CREATE INDEX IF NOT EXISTS idx_teachers_phone ON teachers(phone);

-- 3. Students (Learners)
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(64) PRIMARY KEY,
  handle VARCHAR(64) NOT NULL,
  grade INT NOT NULL,
  county VARCHAR(64),
  school_id VARCHAR(64),
  school_name VARCHAR(255),
  stream VARCHAR(64),
  stream_join_code VARCHAR(64),
  email VARCHAR(255),
  student_email VARCHAR(255),
  student_phone VARCHAR(64),
  parent_phone VARCHAR(64),
  avatar VARCHAR(32) DEFAULT '🦁',
  age INT,
  pin_hash VARCHAR(255),
  subscription_tier VARCHAR(32) DEFAULT 'free',
  tier_updated_at TEXT,
  quests TEXT DEFAULT '[]',               -- JSON array
  free_subjects TEXT DEFAULT '[]',        -- JSON array
  parent_consent INT DEFAULT 0,
  parent_verified INT DEFAULT 0,
  pilot_code VARCHAR(64),
  pilot_type VARCHAR(32),
  pilot_cohort_name VARCHAR(128),
  pilot_activated_at TEXT,
  pilot_expires_at TEXT,
  streak INT DEFAULT 1,
  total_turns INT DEFAULT 0,
  daily_turns_count INT DEFAULT 0,
  daily_turn_date VARCHAR(32),
  failed_login_attempts INT DEFAULT 0,
  locked_until TEXT,
  otp_hash VARCHAR(255),
  otp_expires_at TEXT,
  otp_verified INT DEFAULT 0,
  otp_request_count INT DEFAULT 0,
  created_at TEXT NOT NULL,
  last_active TEXT NOT NULL,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_grade_stream ON students(grade, stream);
CREATE INDEX IF NOT EXISTS idx_students_join_code ON students(stream_join_code);
CREATE INDEX IF NOT EXISTS idx_students_handle ON students(handle);

-- 4. Missions (Live Curriculum Quizzes & Classroom Missions)
CREATE TABLE IF NOT EXISTS missions (
  id VARCHAR(64) PRIMARY KEY,
  teacher_id VARCHAR(64),
  teacher_name VARCHAR(255),
  school_id VARCHAR(64) NOT NULL,
  grade INT NOT NULL,
  stream VARCHAR(64) NOT NULL,
  subject VARCHAR(64) NOT NULL,
  strand VARCHAR(128),
  sub_strand VARCHAR(128),
  title VARCHAR(255) NOT NULL,
  hint_mode VARCHAR(32) DEFAULT 'open',
  hint_delay_minutes INT DEFAULT 0,
  display_mode VARCHAR(32) DEFAULT 'sequential',
  items TEXT NOT NULL,                    -- JSON array of quiz items
  submissions TEXT NOT NULL DEFAULT '{}', -- JSON map of student process trails
  pushed_at TEXT,
  deadline TEXT,
  status VARCHAR(32) DEFAULT 'active',
  created_at TEXT NOT NULL,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_missions_school_stream ON missions(school_id, grade, stream);
CREATE INDEX IF NOT EXISTS idx_missions_subject ON missions(subject);
CREATE INDEX IF NOT EXISTS idx_missions_status ON missions(status);

-- 5. Student Socratic Sessions (Conversation History)
CREATE TABLE IF NOT EXISTS sessions (
  session_key VARCHAR(128) PRIMARY KEY,   -- e.g. stu_123_mathematics
  student_id VARCHAR(64) NOT NULL,
  subject VARCHAR(64) NOT NULL,
  messages TEXT NOT NULL,                 -- JSON array of messages
  last_updated TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_student_id ON sessions(student_id);

-- 6. Parent Accounts (Family Portal)
CREATE TABLE IF NOT EXISTS parents (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(64) UNIQUE,
  family_pin_hash VARCHAR(255),
  verified INT DEFAULT 0,
  verify_token VARCHAR(128),
  token_expires_at TEXT,
  children TEXT DEFAULT '[]',             -- JSON array of child IDs
  pending_children TEXT DEFAULT '[]',     -- JSON array
  subscription_tier VARCHAR(32) DEFAULT 'family_standard',
  student_subscriptions TEXT DEFAULT '{}',-- JSON map
  billing_cycle VARCHAR(32),
  tier_updated_at TEXT,
  failed_login_attempts INT DEFAULT 0,
  locked_until TEXT,
  otp_hash VARCHAR(255),
  otp_expires_at TEXT,
  otp_verified INT DEFAULT 0,
  otp_request_count INT DEFAULT 0,
  otp_cooldown_until TEXT,
  created_at TEXT NOT NULL,
  last_active TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email);
CREATE INDEX IF NOT EXISTS idx_parents_phone ON parents(phone);

-- ══════════════════════════════════════════════════════════════
-- 7. Curricula & Assessment Schema (Relational Pedagogy)
-- ══════════════════════════════════════════════════════════════

-- 7.1 Curricula (System Boundaries: CBC vs. BRITISH)
CREATE TABLE IF NOT EXISTS curricula (
  id VARCHAR(32) PRIMARY KEY,                 -- 'CBC', 'BRITISH'
  name VARCHAR(128) NOT NULL,                 -- 'Competency-Based Education (Kenya)', 'Cambridge Assessment International Education'
  governing_body VARCHAR(128) NOT NULL,       -- 'KICD / KNEC', 'CAIE'
  grading_scale VARCHAR(128) NOT NULL,        -- '4-Level Competency (EE, ME, AE, BE)', 'Letter Grades (A*-G / 9-1)'
  created_at TEXT NOT NULL
);

-- 7.2 Grades / Year Groups (Educational Stages)
CREATE TABLE IF NOT EXISTS grades_or_years (
  id VARCHAR(64) PRIMARY KEY,                 -- 'cbc_g6', 'cie_y10', etc.
  curriculum_id VARCHAR(32) NOT NULL,
  stage_tier VARCHAR(64) NOT NULL,            -- 'UPPER_PRIMARY', 'JSS', 'SENIOR_SCHOOL', 'CHECKPOINT', 'IGCSE'
  code VARCHAR(16) NOT NULL,                  -- '6', '7', '8', '9', '10', '11', '12'
  display_title VARCHAR(128) NOT NULL,        -- 'Grade 8 (Junior School)', 'Year 10 (IGCSE Extended)'
  order_index INT NOT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curricula(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_grades_curr_code ON grades_or_years(curriculum_id, code);

-- 7.3 Subjects / Learning Areas
CREATE TABLE IF NOT EXISTS curriculum_subjects (
  id VARCHAR(64) PRIMARY KEY,                 -- 'cbc_g8_math', 'cie_y10_0580'
  grade_id VARCHAR(64) NOT NULL,
  name VARCHAR(128) NOT NULL,                 -- 'Mathematics', 'Pure Physics', 'English'
  code VARCHAR(32),                           -- NULL for CBE JSS, '0580' for IGCSE Maths
  is_elective INT DEFAULT 0,
  track_pathway VARCHAR(64),                  -- 'STEM', 'Social Sciences', 'Core Compulsory'
  FOREIGN KEY (grade_id) REFERENCES grades_or_years(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_subjects_grade_name ON curriculum_subjects(grade_id, name);

-- 7.4 Learning Strands (Major Topics / Stations)
CREATE TABLE IF NOT EXISTS learning_strands (
  id VARCHAR(64) PRIMARY KEY,                 -- 'cbc_g8_m_numbers', 'cie_y10_m_quadratics'
  subject_id VARCHAR(64) NOT NULL,
  strand_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,                -- 'Whole Numbers to Millions & Operations'
  strand_label VARCHAR(255),                  -- 'Strand 1: Numbers'
  icon VARCHAR(32) DEFAULT '🔢',
  status VARCHAR(32) DEFAULT 'available',     -- 'mastered', 'available', 'active'
  description TEXT,
  order_index INT NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES curriculum_subjects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_strands_subject_order ON learning_strands(subject_id, order_index);

-- 7.5 Sub-Strands (Stations / Subtopics on the Learn Map)
CREATE TABLE IF NOT EXISTS sub_strands (
  id VARCHAR(64) PRIMARY KEY,                 -- 'cbc_g8_m_integers', 'cie_y10_m_completing_square'
  strand_id VARCHAR(64) NOT NULL,
  subtopic_title VARCHAR(255) NOT NULL,
  concept_primer TEXT NOT NULL,
  socratic_inquiry_prompt TEXT NOT NULL,
  formula_hint TEXT,
  exam_focus TEXT,
  status VARCHAR(32) DEFAULT 'available',     -- 'available', 'active', 'mastered' (NEVER 'locked')
  order_index INT NOT NULL,
  FOREIGN KEY (strand_id) REFERENCES learning_strands(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_substrands_strand ON sub_strands(strand_id, order_index);

-- 7.6 Assessment Past Papers
CREATE TABLE IF NOT EXISTS assessment_papers (
  id VARCHAR(64) PRIMARY KEY,                 -- 'knec_kpsea_g6_math_2025', 'cie_0580_2024_mj_p4'
  curriculum_id VARCHAR(32) NOT NULL,
  grade_id VARCHAR(64) NOT NULL,
  subject_name VARCHAR(128) NOT NULL,
  exam_board VARCHAR(64) NOT NULL,            -- 'KNEC', 'CAIE'
  paper_code VARCHAR(64) NOT NULL,            -- 'KPSEA-MATH-2025', '0580/42'
  series VARCHAR(64) NOT NULL,                -- 'November 2025', 'May/June 2024'
  title VARCHAR(255) NOT NULL,
  duration_minutes INT NOT NULL,
  total_marks INT NOT NULL,
  calculator_allowed INT DEFAULT 0,           -- 0 = False (Non-Calc), 1 = True
  created_at TEXT NOT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curricula(id) ON DELETE CASCADE,
  FOREIGN KEY (grade_id) REFERENCES grades_or_years(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_papers_curr_grade ON assessment_papers(curriculum_id, grade_id);

-- 7.7 Assessment Questions & Official Marking Rubrics
CREATE TABLE IF NOT EXISTS assessment_questions (
  id VARCHAR(64) PRIMARY KEY,                 -- 'cie_0580_2024_p4_q1'
  paper_id VARCHAR(64) NOT NULL,
  number INT NOT NULL,
  topic VARCHAR(128) NOT NULL,
  marks INT NOT NULL,
  stem TEXT NOT NULL,
  formula_hint TEXT,
  rubric_marks TEXT NOT NULL,                 -- JSON array of [{ code, type, description, requiredMatch }]
  examiner_pitfalls TEXT,                     -- JSON array of strings
  model_answer TEXT,
  order_index INT NOT NULL,
  FOREIGN KEY (paper_id) REFERENCES assessment_papers(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_questions_paper_number ON assessment_questions(paper_id, number);

-- 8. Practice exam papers (the learner-facing timed papers). Content lives here so it can be edited without a code change.
--    `meta` holds everything about the paper except its questions (JSON); each question's full definition, including its
--    answer and mark scheme, is in exam_paper_questions.data (JSON). Answers are never sent to a learner before a paper is submitted.
--    source: 'seed' = copied from exam_papers/*.js (refreshed when the file changes), 'edited' = changed by an owner (never overwritten),
--            'imported' = added with scripts/exam_papers.js.
CREATE TABLE IF NOT EXISTS exam_papers (
  id VARCHAR(120) PRIMARY KEY,
  curriculum VARCHAR(16) NOT NULL,
  grade_min INT NOT NULL,
  grade_max INT NOT NULL,
  subject VARCHAR(80) NOT NULL,
  title VARCHAR(255) NOT NULL,
  series VARCHAR(255),
  status VARCHAR(16) NOT NULL DEFAULT 'published',   -- 'published' | 'draft'
  source VARCHAR(16) NOT NULL DEFAULT 'seed',
  content_hash VARCHAR(64),
  meta TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_exam_papers_lookup ON exam_papers(curriculum, subject, status);

CREATE TABLE IF NOT EXISTS exam_paper_questions (
  id VARCHAR(160) PRIMARY KEY,
  paper_id VARCHAR(120) NOT NULL,
  position INT NOT NULL,
  section VARCHAR(255),
  topic VARCHAR(120),
  qtype VARCHAR(16) NOT NULL,
  marks INT NOT NULL,
  data TEXT NOT NULL,
  FOREIGN KEY (paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_exam_questions_paper ON exam_paper_questions(paper_id, position);
