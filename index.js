const express = require('express')
const axios = require('axios')
const supabase = require('./config.supabase.js')

const app = express()
const port = 5000
app.use(express.json())

const SERVER_KEY = "SB-Mid-server-IXsO5RkjiKbPs8J0ARCrH8od"
const MIDTRANS_BASE_URL = "https://api.sandbox.midtrans.com/v2"

app.post('/generate-qr', async (req, res) => {
    try{
        const { order_id, gross_amount} = req.body
        const payload = {
            payment_type: 'gopay',
            transaction_details: {
                order_id,
                gross_amount,
            } 
        }

        const response = await axios.post(`${MIDTRANS_BASE_URL}/charge`,payload, {
            headers: {
                'Authorization': `Basic ${Buffer.from(SERVER_KEY + ':').toString('base64')}`,
                "Content-Type": 'application/json'
            }
        })

        const qrImageUrl = response.data.actions[0].url
        const transaction_id = response.data.transaction_id

        const qrResponse = await axios.get(qrImageUrl, {
            responseType: 'arraybuffer'
        })
        const qrBuffer = Buffer.from(qrResponse.data)
        const fileName = `qr-codes/order-bakery-${Date.now()}.png`
        
        const { error } = await supabase.storage.from('qris-images').upload(fileName, qrBuffer, {
            contentType: 'image/png',
            upsert: false
        })

        if(error){
            console.log(error)
            return res.status(500).json({message: 'Failed to upload to Supabase'})
        }

        const { data } = supabase.storage.from('qris-images').getPublicUrl(fileName)

        res.status(200).json({
            message: 'QR Code uploaded successfully',
            url: data.publicUrl,
            transaction_id: transaction_id
        })

    }catch(error){
        res.status(500).send(error.response? error.response.data : error.message)
    }
})

app.get('/',(req, res) => {
    res.json({message: "Ingin menjadi programmer handal, namun enggan ngoding"})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})