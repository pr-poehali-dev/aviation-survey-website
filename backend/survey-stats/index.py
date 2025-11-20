import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get survey statistics for visualization
    Args: event - dict with httpMethod
          context - object with request_id attribute
    Returns: HTTP response dict with statistics data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute("SELECT COUNT(*) FROM survey_responses")
    total_responses = cur.fetchone()[0]
    
    stats = {
        'total': total_responses,
        'interest': {},
        'knowledge': {},
        'career': {},
        'fears': {},
        'future_contribution': {},
        'innovation': {},
        'opinion': {},
        'age_distribution': {}
    }
    
    fields = ['interest', 'knowledge', 'career', 'fears', 'future_contribution', 'innovation', 'opinion']
    
    for field in fields:
        cur.execute(f"SELECT {field}, COUNT(*) FROM survey_responses GROUP BY {field}")
        results = cur.fetchall()
        for value, count in results:
            if value:
                stats[field][value] = count
    
    cur.execute("SELECT CASE WHEN age < 14 THEN 'under_14' WHEN age BETWEEN 14 AND 17 THEN '14-17' WHEN age BETWEEN 18 AND 22 THEN '18-22' ELSE 'over_22' END as age_group, COUNT(*) FROM survey_responses GROUP BY age_group")
    age_results = cur.fetchall()
    for age_group, count in age_results:
        if age_group:
            stats['age_distribution'][age_group] = count
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(stats)
    }
