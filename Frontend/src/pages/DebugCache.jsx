import { useState, useEffect } from 'react';


function DebugCache() {
  const [progress, setProgress] = useState(null);
  const [stats, setStats] = useState(null);
  const [enrichedChallenges, setEnrichedChallenges] = useState([]);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
    console.log(`[${timestamp}] ${message}`);
  };

  const loadData = () => {
    try {
      addLog('Loading cache data...', 'info');
      
      const currentProgress = getProgress();
      const currentStats = getDashboardStats();
      const currentChallenges = getEnrichedChallenges();
      
      setProgress(currentProgress);
      setStats(currentStats);
      setEnrichedChallenges(currentChallenges);
      
      addLog('✅ Data loaded successfully', 'success');
    } catch (error) {
      addLog(`❌ Error loading data: ${error.message}`, 'error');
    }
  };

  useEffect(() => {
    loadData();

    const handleProgressUpdate = (event) => {
      addLog('📢 Progress update event received', 'info');
      loadData();
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
    };
  }, []);

  const testSolveChallenge = (challengeId) => {
    try {
      addLog(`🎯 Testing solve for challenge: ${challengeId}`, 'info');
      markChallengeSolved(challengeId);
      addLog(`✅ Challenge ${challengeId} marked as solved`, 'success');
      loadData();
    } catch (error) {
      addLog(`❌ Error solving challenge: ${error.message}`, 'error');
    }
  };

  const testReset = () => {
    try {
      addLog('🔄 Resetting progress...', 'info');
      resetProgress();
      addLog('✅ Progress reset successfully', 'success');
      loadData();
    } catch (error) {
      addLog(`❌ Error resetting: ${error.message}`, 'error');
    }
  };

  return (
    <div style={{
      padding: '20px',
      background: '#0a0a0a',
      color: '#e0e0e0',
      minHeight: '100vh',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ color: '#2dd68f' }}>🔧 Cache System Debug</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={loadData}
          style={{
            background: '#2dd68f',
            color: '#0a0a0a',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            margin: '5px',
            fontWeight: '600'
          }}
        >
          Reload Data
        </button>
        
        <button 
          onClick={testReset}
          style={{
            background: '#ff4444',
            color: '#ffffff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            margin: '5px',
            fontWeight: '600'
          }}
        >
          Reset Progress
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Progress Data */}
        <div style={{
          background: 'rgba(45, 214, 143, 0.1)',
          border: '1px solid rgba(45, 214, 143, 0.3)',
          borderRadius: '8px',
          padding: '15px'
        }}>
          <h3>Raw Progress Data</h3>
          <pre style={{ 
            fontSize: '12px', 
            overflow: 'auto', 
            maxHeight: '300px',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {JSON.stringify(progress, null, 2)}
          </pre>
        </div>

        {/* Dashboard Stats */}
        <div style={{
          background: 'rgba(45, 214, 143, 0.1)',
          border: '1px solid rgba(45, 214, 143, 0.3)',
          borderRadius: '8px',
          padding: '15px'
        }}>
          <h3>Dashboard Stats</h3>
          <pre style={{ 
            fontSize: '12px', 
            overflow: 'auto', 
            maxHeight: '300px',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {JSON.stringify(stats, null, 2)}
          </pre>
        </div>
      </div>

      {/* Test Challenges */}
      <div style={{
        background: 'rgba(45, 214, 143, 0.1)',
        border: '1px solid rgba(45, 214, 143, 0.3)',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '20px'
      }}>
        <h3>Test Challenge Solving</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {challengesData.map(challenge => (
            <button
              key={challenge.id}
              onClick={() => testSolveChallenge(challenge.id)}
              style={{
                background: enrichedChallenges.find(c => c.id === challenge.id)?.solved 
                  ? '#2dd68f' : 'rgba(45, 214, 143, 0.3)',
                color: enrichedChallenges.find(c => c.id === challenge.id)?.solved 
                  ? '#0a0a0a' : '#e0e0e0',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {challenge.title} ({challenge.points}pts)
              {enrichedChallenges.find(c => c.id === challenge.id)?.solved && ' ✅'}
            </button>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '20px'
      }}>
        <h3>Debug Logs</h3>
        <div style={{ 
          maxHeight: '200px', 
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {logs.map((log, index) => (
            <div 
              key={index}
              style={{ 
                color: log.type === 'error' ? '#ff4444' : 
                       log.type === 'success' ? '#2dd68f' : '#e0e0e0',
                marginBottom: '5px'
              }}
            >
              [{log.timestamp}] {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DebugCache;