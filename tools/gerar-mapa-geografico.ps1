param(
  [Parameter(Mandatory = $true)][string]$GeoJsonPath,
  [Parameter(Mandatory = $true)][string]$OutputPath
)

$ErrorActionPreference = 'Stop'
$west = -9.65
$east = -5.20
$north = 42.30
$south = 36.85
$width = 760
$height = 930

function Convert-X([double]$longitude) {
  return (($longitude - $west) / ($east - $west)) * $width
}

function Convert-Y([double]$latitude) {
  return (($north - $latitude) / ($north - $south)) * $height
}

function Convert-Ring($ring) {
  $commands = for ($index = 0; $index -lt $ring.Count; $index++) {
    $point = $ring[$index]
    $x = Convert-X ([double]$point[0])
    $y = Convert-Y ([double]$point[1])
    $prefix = if ($index -eq 0) { 'M' } else { 'L' }
    [string]::Format([Globalization.CultureInfo]::InvariantCulture, '{0}{1:F2},{2:F2}', $prefix, $x, $y)
  }
  return ($commands -join ' ') + ' Z'
}

function Convert-Geometry($geometry) {
  $paths = @()
  $polygons = if ($geometry.type -eq 'Polygon') { @($geometry.coordinates) } else { $geometry.coordinates }
  foreach ($polygon in $polygons) {
    $outer = $polygon[0]
    $onMainland = $false
    foreach ($point in $outer) {
      if ([double]$point[0] -gt -10 -and [double]$point[0] -lt -5 -and [double]$point[1] -gt 36 -and [double]$point[1] -lt 43) {
        $onMainland = $true
        break
      }
    }
    if (-not $onMainland) { continue }
    foreach ($ring in $polygon) { $paths += Convert-Ring $ring }
  }
  return $paths -join ' '
}

$geo = Get-Content -Raw -LiteralPath $GeoJsonPath | ConvertFrom-Json
$portugal = $geo.features | Where-Object { $_.properties.CNTR_ID -eq 'PT' } | Select-Object -First 1
$spain = $geo.features | Where-Object { $_.properties.CNTR_ID -eq 'ES' } | Select-Object -First 1
$ptPath = Convert-Geometry $portugal.geometry
$esPath = Convert-Geometry $spain.geometry

$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $width $height" role="img" aria-labelledby="title desc">
  <title id="title">Mapa geográfico ilustrado da Raia</title>
  <desc id="desc">Portugal continental e o oeste de Espanha, desenhados a partir dos contornos geográficos do Eurostat.</desc>
  <defs>
    <filter id="paper" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency=".018 .055" numOctaves="3" seed="9" result="noise"/>
      <feColorMatrix in="noise" values="1 0 0 0 .28  0 1 0 0 .23  0 0 1 0 .12  0 0 0 .18 0" result="tint"/>
      <feBlend in="SourceGraphic" in2="tint" mode="multiply"/>
    </filter>
    <pattern id="wash" width="120" height="120" patternUnits="userSpaceOnUse">
      <circle cx="22" cy="38" r="54" fill="#fff" opacity=".08"/>
      <circle cx="96" cy="88" r="45" fill="#6f9670" opacity=".05"/>
    </pattern>
    <linearGradient id="sea" x1="0" x2="1">
      <stop offset="0" stop-color="#b8dced"/><stop offset="1" stop-color="#e7f3f5"/>
    </linearGradient>
  </defs>
  <rect width="$width" height="$height" rx="28" fill="url(#sea)"/>
  <g>
    <path d="$esPath" fill="#ead49a" stroke="#b99045" stroke-width="2.2" stroke-linejoin="round" fill-rule="evenodd"/>
    <path d="$ptPath" fill="#8daf83" stroke="#315f55" stroke-width="2.6" stroke-linejoin="round" fill-rule="evenodd"/>
    <rect width="$width" height="$height" fill="url(#wash)" pointer-events="none"/>
  </g>
  <path d="$ptPath" fill="none" stroke="#f8f2df" stroke-width="1.2" stroke-linejoin="round" opacity=".8"/>
</svg>
"@

[System.IO.File]::WriteAllText((Resolve-Path (Split-Path $OutputPath -Parent)).Path + '\' + (Split-Path $OutputPath -Leaf), $svg, [System.Text.UTF8Encoding]::new($false))
