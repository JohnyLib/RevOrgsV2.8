import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#030712', // terminal black
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2937 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    {/* Logo Icon Style */}
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#3b82f6', // code-blue
                            borderRadius: '12px',
                            marginRight: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '40px',
                            fontWeight: 800,
                        }}
                    >
                        R
                    </div>
                    <div
                        style={{
                            fontSize: '80px',
                            fontWeight: 900,
                            color: 'white',
                            letterSpacing: '-2px',
                        }}
                    >
                        RevOrgs
                    </div>
                </div>
                <div
                    style={{
                        fontSize: '30px',
                        fontWeight: 400,
                        color: '#9ca3af', // gray-400
                        textAlign: 'center',
                        maxWidth: '800px',
                    }}
                >
                    Premium Web Development in Republic of Moldova
                </div>
                <div
                    style={{
                        marginTop: '40px',
                        display: 'flex',
                        gap: '20px',
                    }}
                >
                    <div style={{ padding: '10px 20px', backgroundColor: '#1f2937', color: '#60a5fa', borderRadius: '8px', fontSize: '20px' }}>React</div>
                    <div style={{ padding: '10px 20px', backgroundColor: '#1f2937', color: '#4ade80', borderRadius: '8px', fontSize: '20px' }}>Next.js</div>
                    <div style={{ padding: '10px 20px', backgroundColor: '#1f2937', color: '#a78bfa', borderRadius: '8px', fontSize: '20px' }}>TypeScript</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
