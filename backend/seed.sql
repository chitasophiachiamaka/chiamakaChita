INSERT INTO students (id, display_name, class_name) VALUES
('demo-01', 'Demo Learner 01', 'SS1'), ('demo-02', 'Demo Learner 02', 'SS1'),
('demo-03', 'Demo Learner 03', 'SS1'), ('demo-04', 'Demo Learner 04', 'SS1'),
('demo-05', 'Demo Learner 05', 'SS2'), ('demo-06', 'Demo Learner 06', 'SS2'),
('demo-07', 'Demo Learner 07', 'SS2'), ('demo-08', 'Demo Learner 08', 'SS2'),
('demo-09', 'Demo Learner 09', 'SS3'), ('demo-10', 'Demo Learner 10', 'SS3'),
('demo-11', 'Demo Learner 11', 'SS3'), ('demo-12', 'Demo Learner 12', 'SS3')
ON CONFLICT (id) DO NOTHING;

INSERT INTO results (student_id, subject, score, term) VALUES
('demo-01','Computer Studies',84,'First term'),('demo-01','Mathematics',72,'First term'),('demo-01','English',78,'First term'),
('demo-02','Computer Studies',67,'First term'),('demo-02','Mathematics',61,'First term'),('demo-02','English',73,'First term'),
('demo-03','Computer Studies',91,'First term'),('demo-03','Mathematics',82,'First term'),('demo-03','English',77,'First term'),
('demo-04','Computer Studies',55,'First term'),('demo-04','Mathematics',48,'First term'),('demo-04','English',63,'First term'),
('demo-05','Computer Studies',88,'Second term'),('demo-05','Data Processing',93,'Second term'),('demo-05','Mathematics',75,'Second term'),
('demo-06','Computer Studies',71,'Second term'),('demo-06','Data Processing',69,'Second term'),('demo-06','Mathematics',58,'Second term'),
('demo-07','Computer Studies',79,'Second term'),('demo-07','Data Processing',82,'Second term'),('demo-07','Mathematics',64,'Second term'),
('demo-08','Computer Studies',61,'Second term'),('demo-08','Data Processing',57,'Second term'),('demo-08','Mathematics',52,'Second term'),
('demo-09','Computer Studies',95,'Third term'),('demo-09','Data Processing',88,'Third term'),('demo-09','Mathematics',84,'Third term'),
('demo-10','Computer Studies',74,'Third term'),('demo-10','Data Processing',70,'Third term'),('demo-10','Mathematics',68,'Third term'),
('demo-11','Computer Studies',63,'Third term'),('demo-11','Data Processing',66,'Third term'),('demo-11','Mathematics',56,'Third term'),
('demo-12','Computer Studies',49,'Third term'),('demo-12','Data Processing',53,'Third term'),('demo-12','Mathematics',44,'Third term')
ON CONFLICT (student_id, subject, term) DO NOTHING;
