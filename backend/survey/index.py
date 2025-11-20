import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save survey responses from students about aviation career
    Args: event - dict with httpMethod, body (name, age, institution, interest, knowledge, career, fears, future_contribution, innovation, opinion)
          context - object with request_id attribute
    Returns: HTTP response dict with statusCode, headers, body
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name = body_data.get('name')
    age = body_data.get('age')
    institution = body_data.get('institution')
    interest = body_data.get('interest')
    knowledge = body_data.get('knowledge')
    career = body_data.get('career')
    fears = body_data.get('fears')
    future_contribution = body_data.get('future_contribution')
    innovation = body_data.get('innovation')
    opinion = body_data.get('opinion')
    
    if not all([name, age, institution, interest, knowledge, career, fears, future_contribution, innovation, opinion]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO survey_responses (name, age, institution, interest, knowledge, career, fears, future_contribution, innovation, opinion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (name, int(age), institution, interest, knowledge, career, fears, future_contribution, innovation, opinion)
    )
    
    response_id = cur.fetchone()[0]
    conn.commit()
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'id': response_id,
            'message': 'Survey response saved successfully'
        })
    }