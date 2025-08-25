import { NextResponse } from 'next/server'
import { getScheduleData } from '@/app/lib/order-service'

export async function GET() {
  try {
    const scheduleData = await getScheduleData()
    return NextResponse.json(scheduleData)
  } catch (error) {
    console.error('Error fetching schedule data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schedule data' },
      { status: 500 }
    )
  }
}
