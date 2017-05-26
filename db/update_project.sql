
UPDATE projects
	SET wf_name = $1,
			wf_text = $2,
			fav_wf = $3,
			wf_date = $4
	WHERE wf_id = $5;