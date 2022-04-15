const division = {
    "divisions": [
        {
            "id": "DIVISION_DHK",
            "label": "Dhaka",
            "districts": [
                {
                    "id": "DISTRICT_DHK",
                    "label": "Dhaka",
                    "areas": [
                        {
                            "id": "AREA_DHM",
                            "label": "Dhanmondi"
                        },
                        {
                            "id": "AREA_ZGT",
                            "label": "Zigatola"
                        }
                    ]
                },
                {
                    "id": "DISTRICT_GZ",
                    "label": "Gazipur",
                    "areas": []
                }
            ]
        },
        {
            "id": "DIVISION_SYL",
            "label": "Sylhet",
            "districts": []
        }
    ]
}

function logAreas(divisionId) {
    const data = JSON.parse(JSON.stringify(division))
    const search = data.divisions.find(res => res.id === divisionId);
    if (search) {
        if (search.districts?.length > 0) {
            search.districts.forEach(res => {
                if (res.areas.length > 0) {
                    res.areas.forEach(res => {
                        console.log(res.label)
                    })
                }
            })
        }
    }
}
logAreas('DIVISION_CHIT')


