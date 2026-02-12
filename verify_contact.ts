import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qhowxtaxwscpfnodjaty.supabase.co'
const supabaseKey = 'sb_publishable_7ZcVAlIL2ENT5TbkN6BHOQ_tmfsSn5R'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testContactSubmission() {
    console.log('Testing contact submission to:', supabaseUrl)

    const testData = {
        email: 'test_verification_2@example.com',
        message: 'Second verification attempt with correct keys.',
        name: 'Verification Bot 2'
    }

    const { data, error } = await supabase
        .from('contacts')
        .insert([testData])
        .select()

    if (error) {
        console.error('Error inserting contact:', error)
    } else {
        console.log('Successfully inserted contact:', data)
    }
}

testContactSubmission()
