# Code Explorer - Script d'automatisation pour explorer une large base de code
# Auteur: Trae AI
# Date: 2023

# Paramètres
param (
    [Parameter(Mandatory=$false)]
    [string]$SearchPath = "g:\programme_formation",
    
    [Parameter(Mandatory=$false)]
    [string]$SearchPattern = "*",
    
    [Parameter(Mandatory=$false)]
    [string]$SearchText = "",
    
    [Parameter(Mandatory=$false)]
    [string]$FileExtension = "*",
    
    [Parameter(Mandatory=$false)]
    [switch]$IncludeContent = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Analyze = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Help = $false
)

# Fonction d'aide
function Show-Help {
    Write-Host "Code Explorer - Outil d'exploration automatique de code" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Paramètres:" -ForegroundColor Yellow
    Write-Host "  -SearchPath      : Chemin de recherche (défaut: g:\programme_formation)" -ForegroundColor White
    Write-Host "  -SearchPattern   : Modèle de recherche pour les noms de fichiers (défaut: *)" -ForegroundColor White
    Write-Host "  -SearchText      : Texte à rechercher dans les fichiers" -ForegroundColor White
    Write-Host "  -FileExtension   : Extension de fichier à rechercher (défaut: *)" -ForegroundColor White
    Write-Host "  -IncludeContent  : Inclure le contenu des fichiers dans les résultats" -ForegroundColor White
    Write-Host "  -Analyze         : Analyser la structure du projet" -ForegroundColor White
    Write-Host "  -Help            : Afficher cette aide" -ForegroundColor White
    Write-Host ""
    Write-Host "Exemples:" -ForegroundColor Yellow
    Write-Host "  .\code-explorer.ps1 -SearchText \"useState\" -FileExtension \".tsx\"" -ForegroundColor White
    Write-Host "  .\code-explorer.ps1 -SearchPattern \"*component*\" -Analyze" -ForegroundColor White
    Write-Host "  .\code-explorer.ps1 -Analyze" -ForegroundColor White
    Write-Host ""
}

# Afficher l'aide si demandé
if ($Help) {
    Show-Help
    exit
}

# Fonction pour rechercher des fichiers
function Find-Files {
    param (
        [string]$Path,
        [string]$Pattern,
        [string]$Extension
    )
    
    $fullPattern = "$Pattern$Extension"
    Write-Host "Recherche de fichiers correspondant à '$fullPattern' dans '$Path'..." -ForegroundColor Cyan
    
    try {
        $files = Get-ChildItem -Path $Path -Recurse -File -Filter $fullPattern -ErrorAction SilentlyContinue | 
                 Where-Object { $_.FullName -notmatch 'node_modules' -and $_.FullName -notmatch '\.git' }
        
        Write-Host "$($files.Count) fichiers trouvés." -ForegroundColor Green
        return $files
    }
    catch {
        Write-Host "Erreur lors de la recherche de fichiers: $_" -ForegroundColor Red
        return @()
    }
}

# Fonction pour rechercher du texte dans les fichiers
function Find-TextInFiles {
    param (
        [array]$Files,
        [string]$Text
    )
    
    if ([string]::IsNullOrEmpty($Text)) {
        return $Files
    }
    
    Write-Host "Recherche de '$Text' dans les fichiers..." -ForegroundColor Cyan
    $results = @()
    
    foreach ($file in $Files) {
        try {
            $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -match [regex]::Escape($Text)) {
                $results += $file
            }
        }
        catch {
            Write-Host "Erreur lors de la lecture du fichier $($file.FullName): $_" -ForegroundColor Red
        }
    }
    
    Write-Host "$($results.Count) fichiers contiennent le texte recherché." -ForegroundColor Green
    return $results
}

# Fonction pour afficher les résultats
function Show-Results {
    param (
        [array]$Files,
        [bool]$ShowContent,
        [string]$SearchText
    )
    
    if ($Files.Count -eq 0) {
        Write-Host "Aucun résultat trouvé." -ForegroundColor Yellow
        return
    }
    
    Write-Host ""
    Write-Host "Résultats de la recherche:" -ForegroundColor Cyan
    Write-Host "======================" -ForegroundColor Cyan
    
    foreach ($file in $Files) {
        Write-Host "$($file.FullName)" -ForegroundColor Green
        
        if ($ShowContent) {
            try {
                $content = Get-Content -Path $file.FullName -ErrorAction SilentlyContinue
                
                if (-not [string]::IsNullOrEmpty($SearchText)) {
                    # Afficher les lignes contenant le texte recherché avec contexte
                    for ($i = 0; $i -lt $content.Count; $i++) {
                        if ($content[$i] -match [regex]::Escape($SearchText)) {
                            $lineNumber = $i + 1
                            $startLine = [Math]::Max(0, $i - 2)
                            $endLine = [Math]::Min($content.Count - 1, $i + 2)
                            
                            Write-Host "  Ligne $lineNumber:" -ForegroundColor Yellow
                            
                            for ($j = $startLine; $j -le $endLine; $j++) {
                                if ($j -eq $i) {
                                    Write-Host "    > $($content[$j])" -ForegroundColor Magenta
                                } else {
                                    Write-Host "      $($content[$j])" -ForegroundColor Gray
                                }
                            }
                            Write-Host ""
                        }
                    }
                } else {
                    # Afficher un aperçu du fichier (premières lignes)
                    Write-Host "  Aperçu:" -ForegroundColor Yellow
                    $previewLines = [Math]::Min(5, $content.Count)
                    for ($i = 0; $i -lt $previewLines; $i++) {
                        Write-Host "    $($content[$i])" -ForegroundColor Gray
                    }
                    if ($content.Count -gt $previewLines) {
                        Write-Host "    ..." -ForegroundColor Gray
                    }
                    Write-Host ""
                }
            }
            catch {
                Write-Host "  Erreur lors de la lecture du contenu: $_" -ForegroundColor Red
            }
        }
    }
}

# Fonction pour analyser la structure du projet
function Analyze-ProjectStructure {
    param (
        [string]$Path
    )
    
    Write-Host "Analyse de la structure du projet..." -ForegroundColor Cyan
    
    # Compter les fichiers par extension
    $extensionStats = @{}
    $allFiles = Get-ChildItem -Path $Path -Recurse -File -ErrorAction SilentlyContinue | 
                Where-Object { $_.FullName -notmatch 'node_modules' -and $_.FullName -notmatch '\.git' }
    
    foreach ($file in $allFiles) {
        $ext = $file.Extension
        if ([string]::IsNullOrEmpty($ext)) { $ext = "(sans extension)" }
        
        if ($extensionStats.ContainsKey($ext)) {
            $extensionStats[$ext]++
        } else {
            $extensionStats[$ext] = 1
        }
    }
    
    # Afficher les statistiques par extension
    Write-Host ""
    Write-Host "Statistiques par extension de fichier:" -ForegroundColor Yellow
    Write-Host "===================================" -ForegroundColor Yellow
    
    $extensionStats.GetEnumerator() | Sort-Object -Property Value -Descending | ForEach-Object {
        Write-Host "$($_.Key): $($_.Value) fichiers" -ForegroundColor White
    }
    
    # Analyser la structure des dossiers
    Write-Host ""
    Write-Host "Structure des dossiers principaux:" -ForegroundColor Yellow
    Write-Host "================================" -ForegroundColor Yellow
    
    $mainDirs = Get-ChildItem -Path $Path -Directory -ErrorAction SilentlyContinue | 
                Where-Object { $_.Name -notmatch 'node_modules' -and $_.Name -notmatch '\.git' }
    
    foreach ($dir in $mainDirs) {
        $fileCount = (Get-ChildItem -Path $dir.FullName -Recurse -File -ErrorAction SilentlyContinue).Count
        Write-Host "$($dir.Name): $fileCount fichiers" -ForegroundColor White
        
        # Afficher les sous-dossiers de premier niveau
        $subDirs = Get-ChildItem -Path $dir.FullName -Directory -ErrorAction SilentlyContinue
        foreach ($subDir in $subDirs) {
            $subFileCount = (Get-ChildItem -Path $subDir.FullName -Recurse -File -ErrorAction SilentlyContinue).Count
            Write-Host "  |- $($subDir.Name): $subFileCount fichiers" -ForegroundColor Gray
        }
    }
}

# Exécution principale
Write-Host "Code Explorer - Démarrage de l'exploration..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si le chemin existe
if (-not (Test-Path -Path $SearchPath)) {
    Write-Host "Le chemin spécifié n'existe pas: $SearchPath" -ForegroundColor Red
    exit 1
}

# Analyser la structure du projet si demandé
if ($Analyze) {
    Analyze-ProjectStructure -Path $SearchPath
}

# Rechercher les fichiers correspondant aux critères
$files = Find-Files -Path $SearchPath -Pattern $SearchPattern -Extension $FileExtension

# Rechercher le texte dans les fichiers si spécifié
if (-not [string]::IsNullOrEmpty($SearchText)) {
    $files = Find-TextInFiles -Files $files -Text $SearchText
}

# Afficher les résultats
Show-Results -Files $files -ShowContent $IncludeContent -SearchText $SearchText

Write-Host ""
Write-Host "Exploration terminée." -ForegroundColor Cyan